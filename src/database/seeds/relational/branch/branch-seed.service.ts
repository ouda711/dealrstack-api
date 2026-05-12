import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchEntity } from '../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { TenantEntity } from '../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';

const demoBranches = [
  {
    tenantSlug: 'nairobi-auto-hub',
    name: 'Westlands Showroom',
    code: 'WST',
    city: 'Nairobi',
    address: 'Waiyaki Way, Westlands',
    phone: '+254700000101',
  },
  {
    tenantSlug: 'nairobi-auto-hub',
    name: 'Mombasa Road Yard',
    code: 'MBR',
    city: 'Nairobi',
    address: 'Mombasa Road, near ICD',
    phone: '+254700000102',
  },
  {
    tenantSlug: 'mombasa-motors-yard',
    name: 'Nyali Showroom',
    code: 'NYL',
    city: 'Mombasa',
    address: 'Links Road, Nyali',
    phone: '+254700000201',
  },
  {
    tenantSlug: 'mombasa-motors-yard',
    name: 'Tudor Yard',
    code: 'TDR',
    city: 'Mombasa',
    address: 'Tom Mboya Avenue, Tudor',
    phone: '+254700000202',
  },
];

@Injectable()
export class BranchSeedService {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async run() {
    for (const branch of demoBranches) {
      const tenant = await this.tenantRepository.findOne({
        where: {
          slug: branch.tenantSlug,
        },
      });

      if (!tenant) {
        continue;
      }

      const exists = await this.branchRepository.findOne({
        where: {
          tenant: {
            id: tenant.id,
          },
          code: branch.code,
        },
      });

      if (!exists) {
        await this.branchRepository.save(
          this.branchRepository.create({
            tenant,
            name: branch.name,
            code: branch.code,
            city: branch.city,
            address: branch.address,
            phone: branch.phone,
            isActive: true,
          }),
        );
      }
    }
  }
}
