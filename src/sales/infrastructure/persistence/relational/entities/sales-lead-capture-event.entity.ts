import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { SalesLeadEntity } from './sales-lead.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({ name: 'sales_lead_capture_event' })
@Unique('UQ_sales_lead_capture_event', ['tenantId', 'source', 'externalId'])
export class SalesLeadCaptureEventEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  tenantId: number;

  @ManyToOne(() => TenantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column({ type: String, length: 32 })
  source: string;

  @Column({ type: String, length: 128 })
  externalId: string;

  @Column({ type: 'int', nullable: true })
  leadId?: number | null;

  @ManyToOne(() => SalesLeadEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'leadId' })
  lead?: SalesLeadEntity | null;

  @CreateDateColumn()
  createdAt: Date;
}
