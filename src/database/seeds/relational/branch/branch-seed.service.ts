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
    managerName: 'Grace Wanjiku',
    managerPhone: '+254700000111',
    managerEmail: 'grace@nairobi-auto-hub.co.ke',
    openingHours: 'Mon-Sat, 8:30 AM - 6:00 PM',
  },
  {
    tenantSlug: 'nairobi-auto-hub',
    name: 'Mombasa Road Yard',
    code: 'MBR',
    city: 'Nairobi',
    address: 'Mombasa Road, near ICD',
    phone: '+254700000102',
    managerName: 'Brian Otieno',
    managerPhone: '+254700000112',
    managerEmail: 'brian@nairobi-auto-hub.co.ke',
    openingHours: 'Mon-Sat, 9:00 AM - 6:00 PM',
  },
  {
    tenantSlug: 'mombasa-motors-yard',
    name: 'Nyali Showroom',
    code: 'NYL',
    city: 'Mombasa',
    address: 'Links Road, Nyali',
    phone: '+254700000201',
    managerName: 'Amina Bakari',
    managerPhone: '+254700000211',
    managerEmail: 'amina@mombasa-motors.co.ke',
    openingHours: 'Mon-Sat, 8:30 AM - 5:30 PM',
  },
  {
    tenantSlug: 'mombasa-motors-yard',
    name: 'Tudor Yard',
    code: 'TDR',
    city: 'Mombasa',
    address: 'Tom Mboya Avenue, Tudor',
    phone: '+254700000202',
    managerName: 'Hassan Mwinyi',
    managerPhone: '+254700000212',
    managerEmail: 'hassan@mombasa-motors.co.ke',
    openingHours: 'Mon-Fri, 9:00 AM - 6:00 PM',
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
            managerName: branch.managerName,
            managerPhone: branch.managerPhone,
            managerEmail: branch.managerEmail,
            openingHours: branch.openingHours,
            isActive: true,
          }),
        );
      } else {
        await this.branchRepository.save(
          this.branchRepository.create({
            ...exists,
            managerName: branch.managerName,
            managerPhone: branch.managerPhone,
            managerEmail: branch.managerEmail,
            openingHours: branch.openingHours,
          }),
        );
      }
    }
  }
}
