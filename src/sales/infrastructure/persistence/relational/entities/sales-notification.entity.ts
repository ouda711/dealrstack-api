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
import { NotificationKind } from '../../../../domain/sales.enums';
import { SalesDealEntity } from './sales-deal.entity';
import { SalesLeadEntity } from './sales-lead.entity';

@Entity({ name: 'sales_notification' })
@Unique('UQ_sales_notification_tenant_demo_key', ['tenantId', 'demoKey'])
export class SalesNotificationEntity extends EntityRelationalHelper {
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

  @Column({ type: 'enum', enum: NotificationKind })
  kind: NotificationKind;

  @Column({ type: String, length: 200 })
  title: string;

  @Column({ type: String, length: 500 })
  body: string;

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

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
