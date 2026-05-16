import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import { TenantWhatsAppIntegrationDto } from './domain/tenant-whatsapp-integration.dto';
import { CompleteWhatsAppEmbeddedSignupDto } from './dto/complete-whatsapp-embedded-signup.dto';
import { UpsertTenantWhatsAppIntegrationDto } from './dto/upsert-tenant-whatsapp-integration.dto';
import { WhatsAppEmbeddedSignupConfigDto } from './domain/whatsapp-embedded-signup-config.dto';
import { WhatsAppEmbeddedSignupService } from './whatsapp-embedded-signup.service';
import { WhatsAppIntegrationService } from './whatsapp-integration.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('WhatsApp integration')
@Controller({
  path: 'tenants/:tenantId/whatsapp-integration',
  version: '1',
})
export class WhatsAppIntegrationController {
  constructor(
    private readonly integrationService: WhatsAppIntegrationService,
    private readonly embeddedSignupService: WhatsAppEmbeddedSignupService,
  ) {}

  @ApiOkResponse({ type: WhatsAppEmbeddedSignupConfigDto })
  @ApiOperation({
    summary: 'Public Meta Embedded Signup config for the frontend SDK',
  })
  @Get('embedded-signup/config')
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  getEmbeddedSignupConfig() {
    return this.embeddedSignupService.getSignupConfig();
  }

  @ApiOkResponse({ type: TenantWhatsAppIntegrationDto })
  @ApiOperation({
    summary:
      'Complete Meta Embedded Signup and store tenant WhatsApp credentials',
  })
  @Post('embedded-signup/complete')
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  completeEmbeddedSignup(
    @Param('tenantId') tenantId: number,
    @Body() dto: CompleteWhatsAppEmbeddedSignupDto,
  ) {
    return this.embeddedSignupService.completeSignup(Number(tenantId), dto);
  }

  @ApiOkResponse({ type: TenantWhatsAppIntegrationDto })
  @ApiOperation({
    summary:
      'Get tenant WhatsApp Cloud API connection (token is never returned)',
  })
  @Get()
  @RequirePermissions('team.manage', 'leads.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  async getIntegration(@Param('tenantId') tenantId: number) {
    const integration = await this.integrationService.getByTenantId(
      Number(tenantId),
    );

    return (
      integration ?? {
        tenantId: String(tenantId),
        phoneNumberId: '',
        wabaId: null,
        displayPhoneNumber: null,
        isEnabled: false,
        hasAccessToken: false,
        accessTokenLast4: null,
      }
    );
  }

  @ApiOkResponse({ type: TenantWhatsAppIntegrationDto })
  @ApiOperation({
    summary: 'Connect or update tenant WhatsApp credentials',
    description:
      'Each dealership stores its own Phone Number ID and access token from Meta.',
  })
  @Put()
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  upsertIntegration(
    @Param('tenantId') tenantId: number,
    @Body() dto: UpsertTenantWhatsAppIntegrationDto,
  ) {
    return this.integrationService.upsertForTenant(Number(tenantId), dto);
  }

  @ApiOperation({ summary: 'Disconnect tenant WhatsApp integration' })
  @Delete()
  @RequirePermissions('team.manage')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'tenantId', type: Number, required: true })
  async deleteIntegration(@Param('tenantId') tenantId: number) {
    await this.integrationService.deleteForTenant(Number(tenantId));
  }
}
