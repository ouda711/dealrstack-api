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
import {
  FollowUpStatus,
  SalesActivityType,
} from '../../../../domain/sales.enums';
import { SalesDealEntity } from './sales-deal.entity';
import { SalesLeadEntity } from './sales-lead.entity';

@Entity({ name: 'sales_activity' })
@Unique('UQ_sales_activity_tenant_demo_key', ['tenantId', 'demoKey'])
export class SalesActivityEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  tenantId: number;

  @ManyToOne(() => TenantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column({ type: String, length: 64, nullable: true })
  demoKey?: string | null;

  @Column({ type: 'int', nullable: true })
  leadId?: number | null;

  @ManyToOne(() => SalesLeadEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leadId' })
  lead?: SalesLeadEntity | null;

  @Column({ type: 'int', nullable: true })
  dealId?: number | null;

  @ManyToOne(() => SalesDealEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dealId' })
  deal?: SalesDealEntity | null;

  @Column({ type: 'enum', enum: SalesActivityType })
  type: SalesActivityType;

  @Column({ type: String, length: 500 })
  summary: string;

  @Column({ type: 'timestamptz', nullable: true })
  dueAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date | null;

  @Column({
    type: 'enum',
    enum: FollowUpStatus,
    default: FollowUpStatus.Pending,
  })
  status: FollowUpStatus;

  @Column({ default: false })
  automated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
