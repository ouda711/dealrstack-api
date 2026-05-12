import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { RoleEnum } from '../../../../roles/roles.enum';
import { StatusEnum } from '../../../../statuses/statuses.enum';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async run() {
    await this.seedUser({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@dealrstack.com',
      role: {
        id: RoleEnum.superAdmin,
        name: 'Super Admin',
      },
    });

    await this.seedUser({
      firstName: 'Tina',
      lastName: 'Tenant Admin',
      email: 'tenant-admin@dealrstack.com',
      role: {
        id: RoleEnum.user,
        name: 'User',
      },
    });

    await this.seedUser({
      firstName: 'John',
      lastName: 'Sales',
      email: 'sales@dealrstack.com',
      role: {
        id: RoleEnum.user,
        name: 'User',
      },
    });
  }

  private async seedUser({
    firstName,
    lastName,
    email,
    role,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    role: {
      id: RoleEnum;
      name: string;
    };
  }) {
    const countUser = await this.repository.count({
      where: {
        email,
      },
    });

    if (!countUser) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash('secret', salt);
      await this.repository.save(
        this.repository.create({
          firstName,
          lastName,
          email,
          password,
          role,
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );
    }
  }
}
