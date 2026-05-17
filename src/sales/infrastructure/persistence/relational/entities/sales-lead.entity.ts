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
import { BranchEntity } from '../../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import {
  LeadPriority,
  LeadSource,
  LeadStatus,
} from '../../../../domain/sales.enums';
@Entity({ name: 'sales_lead' })
@Unique('UQ_sales_lead_tenant_demo_key', ['tenantId', 'demoKey'])
export class SalesLeadEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  tenantId: number;

  @ManyToOne(() => TenantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Index()
  @Column({ type: 'int' })
  branchId: number;

  @ManyToOne(() => BranchEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @Index()
  @Column({ type: String, length: 64, nullable: true })
  demoKey?: string | null;

  @Column({ type: 'enum', enum: LeadSource })
  source: LeadSource;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.New })
  status: LeadStatus;

  @Column({ type: 'enum', enum: LeadPriority, default: LeadPriority.Normal })
  priority: LeadPriority;

  @Column({ type: String, length: 150 })
  customerName: string;

  @Column({ type: String, length: 32 })
  customerPhone: string;

  @Column({ type: String, length: 500 })
  interestSummary: string;

  @Column({ type: 'int', nullable: true })
  vehicleId?: number | null;

  @Column({ type: 'int', nullable: true })
  assignedUserId?: number | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignedUserId' })
  assignedUser?: UserEntity | null;

  @Column({ type: String, length: 255, nullable: true })
  assignmentReason?: string | null;

  @Column({ default: false })
  unread: boolean;

  @Column({ type: 'timestamptz' })
  slaDueAt: Date;

  @Column({ type: 'timestamptz' })
  lastActivityAt: Date;

  @Column({ type: String, length: 255, nullable: true })
  lostReason?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
