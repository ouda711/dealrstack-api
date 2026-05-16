import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BranchEntity } from '../../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SalesLeadEntity } from './sales-lead.entity';
import { SalesMessageEntity } from './sales-message.entity';

@Entity({ name: 'sales_conversation' })
@Unique('UQ_sales_conversation_tenant_demo_key', ['tenantId', 'demoKey'])
export class SalesConversationEntity extends EntityRelationalHelper {
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

  @Index()
  @Column({ type: String, length: 64, nullable: true })
  demoKey?: string | null;

  @Column({ type: String, length: 150 })
  customerName: string;

  @Column({ type: String, length: 32 })
  customerPhone: string;

  @Index()
  @Column({ type: 'int' })
  assignedUserId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'assignedUserId' })
  assignedUser: UserEntity;

  @Column({ type: 'int', default: 0 })
  unreadCount: number;

  @Column({ type: String, length: 500 })
  lastMessagePreview: string;

  @Column({ type: 'timestamptz' })
  lastMessageAt: Date;

  @Column({ type: 'text', nullable: true })
  internalNotes?: string | null;

  @OneToMany(() => SalesMessageEntity, (message) => message.conversation)
  messages: SalesMessageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
