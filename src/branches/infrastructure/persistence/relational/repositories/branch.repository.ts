import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Branch } from '../../../../domain/branch';
import { BranchRepository } from '../../branch.repository';
import { BranchEntity } from '../entities/branch.entity';
import { BranchMapper } from '../mappers/branch.mapper';

@Injectable()
export class BranchesRelationalRepository implements BranchRepository {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchesRepository: Repository<BranchEntity>,
  ) {}

  async create(data: Branch): Promise<Branch> {
    const persistenceModel = BranchMapper.toPersistence(data);
    const newEntity = await this.branchesRepository.save(
      this.branchesRepository.create(persistenceModel),
    );

    return BranchMapper.toDomain(newEntity);
  }

  async findByTenantId(tenantId: number): Promise<Branch[]> {
    const entities = await this.branchesRepository.find({
      where: {
        tenant: {
          id: tenantId,
        },
      },
      order: {
        name: 'ASC',
      },
    });

    return entities.map((branch) => BranchMapper.toDomain(branch));
  }

  async findByTenantIdAndId(
    tenantId: number,
    id: Branch['id'],
  ): Promise<NullableType<Branch>> {
    const entity = await this.branchesRepository.findOne({
      where: {
        id: Number(id),
        tenant: {
          id: tenantId,
        },
      },
    });

    return entity ? BranchMapper.toDomain(entity) : null;
  }

  async findByTenantIdAndCode(
    tenantId: number,
    code: Branch['code'],
  ): Promise<NullableType<Branch>> {
    const entity = await this.branchesRepository.findOne({
      where: {
        code,
        tenant: {
          id: tenantId,
        },
      },
    });

    return entity ? BranchMapper.toDomain(entity) : null;
  }

  async update(
    tenantId: number,
    id: Branch['id'],
    payload: Partial<Branch>,
  ): Promise<Branch | null> {
    const entity = await this.branchesRepository.findOne({
      where: {
        id: Number(id),
        tenant: {
          id: tenantId,
        },
      },
    });

    if (!entity) {
      return null;
    }

    const updatedEntity = await this.branchesRepository.save(
      this.branchesRepository.create(
        BranchMapper.toPersistence({
          ...BranchMapper.toDomain(entity),
          ...payload,
          tenant: {
            id: tenantId,
            ...payload.tenant,
          },
        }),
      ),
    );

    return BranchMapper.toDomain(updatedEntity);
  }

  async remove(tenantId: number, id: Branch['id']): Promise<void> {
    const entity = await this.branchesRepository.findOne({
      where: {
        id: Number(id),
        tenant: {
          id: tenantId,
        },
      },
    });

    if (entity) {
      await this.branchesRepository.softDelete(entity.id);
    }
  }
}
