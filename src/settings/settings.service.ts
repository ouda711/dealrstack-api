import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingEntity } from './infrastructure/persistence/relational/entities/setting.entity';

const DEFAULT_CACHE_MS = 60_000;

type CacheEntry<T> = { expiresAt: number; data: T };

@Injectable()
export class SettingsService {
  private readonly jsonCache = new Map<string, CacheEntry<unknown>>();
  private readonly cacheTtlMs: number;

  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingsRepository: Repository<SettingEntity>,
  ) {
    this.cacheTtlMs = DEFAULT_CACHE_MS;
  }

  invalidateCache(name: string): void {
    this.jsonCache.delete(name);
  }

  async findByName(name: string): Promise<SettingEntity | null> {
    return this.settingsRepository.findOne({ where: { name } });
  }

  /**
   * Cached JSON blob for hot paths (e.g. AI streaming). Invalidate after writes.
   */
  async getCachedJson<T>(name: string): Promise<T | null> {
    const now = Date.now();
    const hit = this.jsonCache.get(name);
    if (hit && hit.expiresAt > now) {
      return hit.data as T;
    }

    const row = await this.findByName(name);
    const data = (row?.value ?? null) as T | null;
    if (data !== null) {
      this.jsonCache.set(name, {
        data,
        expiresAt: now + this.cacheTtlMs,
      });
    }
    return data;
  }

  async upsertValue(
    name: string,
    value: Record<string, unknown>,
  ): Promise<SettingEntity> {
    let row = await this.findByName(name);
    if (!row) {
      row = this.settingsRepository.create({ name, value });
    } else {
      row.value = value;
    }
    const saved = await this.settingsRepository.save(row);
    this.invalidateCache(name);
    return saved;
  }
}
