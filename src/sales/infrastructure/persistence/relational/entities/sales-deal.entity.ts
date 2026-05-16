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
import { SalesLeadEntity } from './sales-lead.entity';
import { SalesConversationEntity } from './sales-conversation.entity';

@Entity({ name: 'sales_deal' })
@Unique('UQ_sales_deal_tenant_demo_key', ['tenantId', 'demoKey'])
export class SalesDealEntity extends EntityRelationalHelper {
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
  @Column({ type: 'int' })
  leadId: number;

  @ManyToOne(() => SalesLeadEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leadId' })
  lead: SalesLeadEntity;

  @Column({ type: 'int', nullable: true })
  conversationId?: number | null;

  @ManyToOne(() => SalesConversationEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'conversationId' })
  conversation?: SalesConversationEntity | null;

  @Index()
  @Column({ type: String, length: 64, nullable: true })
  demoKey?: string | null;

  @Index()
  @Column({ type: String, length: 50 })
  stageKey: string;

  @Column({ type: String, length: 200 })
  title: string;

  @Column({ type: String, length: 2048, nullable: true })
  imageUrl?: string | null;

  @Column({ type: 'bigint', default: 0 })
  valueKes: string;

  @Index()
  @Column({ type: 'int' })
  assignedUserId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'assignedUserId' })
  assignedUser: UserEntity;

  @Column({ type: String, length: 255, nullable: true })
  assignmentReason?: string | null;

  @Column({ type: 'timestamptz' })
  lastActivityAt: Date;

  @Column({ type: 'int', default: 0 })
  inactiveDays: number;

  @Column({ type: 'int', default: 0 })
  boardSortOrder: number;

  @Column({ type: 'timestamptz', nullable: true })
  slaDueAt?: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
