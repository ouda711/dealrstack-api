import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleConfig } from '../auth-google/config/google-config.type';
import { GoogleCalendarConfig } from './config/google-calendar.config';
import {
  SalesAppointmentStatus,
  SalesAppointmentType,
  SalesCalendarProvider,
} from './domain/sales.enums';
import { SalesAppointmentEntity } from './infrastructure/persistence/relational/entities/sales-appointment.entity';
import { SalesCalendarConnectionEntity } from './infrastructure/persistence/relational/entities/sales-calendar-connection.entity';
import { SalesLeadEntity } from './infrastructure/persistence/relational/entities/sales-lead.entity';

const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events';

@Injectable()
export class SalesCalendarSyncService {
  private readonly logger = new Logger(SalesCalendarSyncService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(SalesCalendarConnectionEntity)
    private readonly connectionRepository: Repository<SalesCalendarConnectionEntity>,
    @InjectRepository(SalesAppointmentEntity)
    private readonly appointmentRepository: Repository<SalesAppointmentEntity>,
    @InjectRepository(SalesLeadEntity)
    private readonly leadRepository: Repository<SalesLeadEntity>,
  ) {}

  async listConnections(tenantId: number, userId: number) {
    const connections = await this.connectionRepository.find({
      where: { tenantId, userId },
      order: { provider: 'ASC' },
    });

    return {
      connections: connections.map((item) => ({
        id: item.id,
        provider: item.provider,
        calendarId: item.calendarId,
        syncEnabled: item.syncEnabled,
        connectedAt: item.createdAt.toISOString(),
      })),
    };
  }

  getGoogleAuthorizeUrl(
    tenantId: number,
    userId: number,
    redirectUri?: string,
  ) {
    const google = this.configService.get<GoogleConfig>('google', {
      infer: true,
    });
    const calendar = this.configService.get<GoogleCalendarConfig>(
      'googleCalendar',
      {
        infer: true,
      },
    );

    if (!google?.clientId) {
      throw new ServiceUnavailableException({
        error: 'googleCalendarNotConfigured',
      });
    }

    const resolvedRedirect =
      redirectUri?.trim() || calendar?.redirectUri?.trim() || undefined;

    if (!resolvedRedirect) {
      throw new BadRequestException({
        error: 'googleCalendarRedirectUriRequired',
      });
    }

    const state = Buffer.from(
      JSON.stringify({
        tenantId,
        userId,
        provider: SalesCalendarProvider.Google,
      }),
    ).toString('base64url');

    const params = new URLSearchParams({
      client_id: google.clientId,
      redirect_uri: resolvedRedirect,
      response_type: 'code',
      scope: GOOGLE_CALENDAR_SCOPE,
      access_type: 'offline',
      prompt: 'consent',
      state,
    });

    return {
      url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      state,
    };
  }

  async connectGoogle(
    tenantId: number,
    userId: number,
    code: string,
    redirectUri: string,
  ) {
    const tokens = await this.exchangeGoogleCode(code, redirectUri);

    const existing = await this.connectionRepository.findOne({
      where: {
        tenantId,
        userId,
        provider: SalesCalendarProvider.Google,
      },
    });

    const payload: Partial<SalesCalendarConnectionEntity> = {
      tenantId,
      userId,
      provider: SalesCalendarProvider.Google,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? existing?.refreshToken ?? null,
      tokenExpiresAt: tokens.expires_in
        ? new Date(Date.now() + tokens.expires_in * 1000)
        : null,
      calendarId: 'primary',
      syncEnabled: true,
    };

    const saved = existing
      ? await this.connectionRepository.save({ ...existing, ...payload })
      : await this.connectionRepository.save(
          this.connectionRepository.create(payload),
        );

    return {
      connection: {
        id: saved.id,
        provider: saved.provider,
        syncEnabled: saved.syncEnabled,
      },
    };
  }

  async disconnect(tenantId: number, userId: number, connectionId: number) {
    const connection = await this.connectionRepository.findOne({
      where: { id: connectionId, tenantId, userId },
    });

    if (!connection) {
      throw new NotFoundException({ error: 'calendarConnectionNotFound' });
    }

    await this.connectionRepository.remove(connection);
    return { disconnected: true };
  }

  async syncAppointmentForTenant(
    tenantId: number,
    appointmentId: number,
    actingUserId?: number,
  ) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId, tenantId },
    });

    if (
      !appointment ||
      appointment.status === SalesAppointmentStatus.Cancelled
    ) {
      return;
    }

    const lead = await this.leadRepository.findOne({
      where: { id: appointment.leadId, tenantId },
    });

    const connections = await this.connectionRepository.find({
      where: {
        tenantId,
        syncEnabled: true,
        ...(actingUserId ? { userId: actingUserId } : {}),
      },
    });

    for (const connection of connections) {
      if (connection.provider !== SalesCalendarProvider.Google) {
        continue;
      }

      try {
        const accessToken = await this.ensureGoogleAccessToken(connection);
        const eventId = await this.upsertGoogleEvent(
          accessToken,
          connection.calendarId ?? 'primary',
          appointment,
          lead?.customerName ?? 'Customer',
          appointment.externalCalendarEventId,
        );

        appointment.externalCalendarEventId = eventId;
        appointment.externalCalendarProvider = SalesCalendarProvider.Google;
        await this.appointmentRepository.save(appointment);
      } catch (error) {
        this.logger.warn(
          `Calendar sync failed for appointment ${appointmentId} (${connection.provider}): ${error instanceof Error ? error.message : error}`,
        );
      }
    }
  }

  private async exchangeGoogleCode(code: string, redirectUri: string) {
    const google = this.configService.get<GoogleConfig>('google', {
      infer: true,
    });

    if (!google?.clientId || !google?.clientSecret) {
      throw new ServiceUnavailableException({
        error: 'googleCalendarNotConfigured',
      });
    }

    const body = new URLSearchParams({
      code,
      client_id: google.clientId,
      client_secret: google.clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!response.ok) {
      throw new BadRequestException({ error: 'googleCalendarOAuthFailed' });
    }

    return (await response.json()) as {
      access_token: string;
      refresh_token?: string;
      expires_in?: number;
    };
  }

  private async ensureGoogleAccessToken(
    connection: SalesCalendarConnectionEntity,
  ) {
    const expiresSoon =
      connection.tokenExpiresAt &&
      connection.tokenExpiresAt.getTime() < Date.now() + 60_000;

    if (!expiresSoon) {
      return connection.accessToken;
    }

    if (!connection.refreshToken) {
      return connection.accessToken;
    }

    const google = this.configService.get<GoogleConfig>('google', {
      infer: true,
    });

    if (!google?.clientId || !google?.clientSecret) {
      return connection.accessToken;
    }

    const body = new URLSearchParams({
      client_id: google.clientId,
      client_secret: google.clientSecret,
      refresh_token: connection.refreshToken,
      grant_type: 'refresh_token',
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!response.ok) {
      return connection.accessToken;
    }

    const tokens = (await response.json()) as {
      access_token: string;
      expires_in?: number;
    };

    connection.accessToken = tokens.access_token;
    connection.tokenExpiresAt = tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000)
      : null;
    await this.connectionRepository.save(connection);

    return connection.accessToken;
  }

  private async upsertGoogleEvent(
    accessToken: string,
    calendarId: string,
    appointment: SalesAppointmentEntity,
    customerName: string,
    existingEventId?: string | null,
  ) {
    const start = appointment.scheduledAt;
    const end = new Date(
      start.getTime() + appointment.durationMinutes * 60_000,
    );

    const eventBody = {
      summary: `${this.appointmentTypeLabel(appointment.type)} — ${customerName}`,
      description: appointment.notes ?? undefined,
      location: appointment.location ?? undefined,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;

    if (existingEventId) {
      const response = await fetch(
        `${base}/${encodeURIComponent(existingEventId)}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventBody),
        },
      );

      if (response.ok) {
        const data = (await response.json()) as { id: string };
        return data.id;
      }
    }

    const response = await fetch(base, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventBody),
    });

    if (!response.ok) {
      throw new Error(`googleCalendarInsertFailed:${response.status}`);
    }

    const data = (await response.json()) as { id: string };
    return data.id;
  }

  private appointmentTypeLabel(type: SalesAppointmentType) {
    switch (type) {
      case SalesAppointmentType.TestDrive:
        return 'Test drive';
      case SalesAppointmentType.Visit:
        return 'Visit';
      case SalesAppointmentType.Call:
        return 'Call';
      default:
        return 'Appointment';
    }
  }
}
