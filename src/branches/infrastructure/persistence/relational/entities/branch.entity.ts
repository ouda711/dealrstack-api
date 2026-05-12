import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'branch',
})
@Unique('UQ_branch_tenant_code', ['tenant', 'code'])
export class BranchEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Index()
  @Column({ type: String })
  name: string;

  @Index()
  @Column({ type: String })
  code: string;

  @Index()
  @Column({ type: String })
  city: string;

  @Column({ type: String, nullable: true })
  address?: string | null;

  @Column({ type: String, nullable: true })
  phone?: string | null;

  @Column({ type: String, nullable: true })
  managerName?: string | null;

  @Column({ type: String, nullable: true })
  managerPhone?: string | null;

  @Column({ type: String, nullable: true })
  managerEmail?: string | null;

  @Column({ type: String, nullable: true })
  openingHours?: string | null;

  @Index()
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
