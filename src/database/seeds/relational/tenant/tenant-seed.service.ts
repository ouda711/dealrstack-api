import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from '../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';

const demoTenants = [
  {
    name: 'Nairobi Auto Hub',
    slug: 'nairobi-auto-hub',
    country: 'KE',
    timezone: 'Africa/Nairobi',
    currency: 'KES',
    phone: '+254700000001',
    email: 'sales@nairobi-auto-hub.co.ke',
    website: 'https://nairobi-auto-hub.co.ke',
    isActive: true,
  },
  {
    name: 'Mombasa Motors Yard',
    slug: 'mombasa-motors-yard',
    country: 'KE',
    timezone: 'Africa/Nairobi',
    currency: 'KES',
    phone: '+254700000002',
    email: 'hello@mombasa-motors.co.ke',
    website: 'https://mombasa-motors.co.ke',
    isActive: true,
  },
];

@Injectable()
export class TenantSeedService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly repository: Repository<TenantEntity>,
  ) {}

  async run() {
    for (const tenant of demoTenants) {
      const exists = await this.repository.findOne({
        where: {
          slug: tenant.slug,
        },
      });

      if (!exists) {
        await this.repository.save(this.repository.create(tenant));
      }
    }

    const nairobi = await this.repository.findOne({
      where: { slug: 'nairobi-auto-hub' },
    });

    if (nairobi && !nairobi.websiteLeadCaptureToken) {
      nairobi.websiteLeadCaptureToken = randomBytes(24).toString('hex');
      await this.repository.save(nairobi);
    }
  }
}
