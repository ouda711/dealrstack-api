import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export enum TenantMembershipStatus {
  Active = 'active',
  Invited = 'invited',
  Suspended = 'suspended',
}

@Entity({
  name: 'tenant_membership',
})
@Unique('UQ_tenant_membership_user_tenant', ['user', 'tenant'])
export class TenantMembershipEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => TenantEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @ManyToOne(() => RoleEntity, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @Index()
  @Column({ default: TenantMembershipStatus.Active })
  status: TenantMembershipStatus;

  @Column({ type: String, nullable: true })
  title?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
