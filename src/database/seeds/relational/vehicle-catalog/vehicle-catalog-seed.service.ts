import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleBrandEntity } from '../../../../vehicles/infrastructure/persistence/relational/entities/vehicle-brand.entity';
import {
  VehicleBrandSeed,
  vehicleBrandsList,
} from './data/vehicle-brands-from-carstrel.seed';

@Injectable()
export class VehicleCatalogSeedService {
  constructor(
    @InjectRepository(VehicleBrandEntity)
    private readonly vehicleBrandRepository: Repository<VehicleBrandEntity>,
  ) {}

  async run(): Promise<void> {
    for (const brand of vehicleBrandsList) {
      await this.ensureBrand(brand);
    }
  }

  private async ensureBrand(brand: VehicleBrandSeed): Promise<void> {
    const name = brand.name.trim();
    const slug = this.resolveSlug(brand, name);
    const logoUrl = this.resolveLogoUrl(brand);
    const countryOfOrigin = brand.country?.trim() || null;

    const existing = await this.vehicleBrandRepository.findOne({
      where: [{ slug }, { name }],
    });

    if (existing) {
      return;
    }

    await this.vehicleBrandRepository.save(
      this.vehicleBrandRepository.create({
        name,
        slug,
        logoUrl,
        countryOfOrigin,
        isLuxuryBrand: brand.isLuxuryBrand === true,
        marketRank: brand.marketRank ?? null,
        isFeatured: false,
      }),
    );
  }

  private resolveSlug(brand: VehicleBrandSeed, name: string): string {
    const fromSeed = brand.slug?.trim();

    if (fromSeed) {
      return this.slugify(fromSeed);
    }

    return this.slugify(name);
  }

  private resolveLogoUrl(brand: VehicleBrandSeed): string | null {
    const direct = brand.logoUrl?.trim();

    if (direct) {
      return direct;
    }

    return (
      brand.image?.optimized?.trim() || brand.image?.source?.trim() || null
    );
  }

  private slugify(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
