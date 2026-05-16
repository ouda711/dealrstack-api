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
import { AssignmentRuleType } from '../../../../domain/sales.enums';

@Entity({ name: 'sales_assignment_rule' })
@Unique('UQ_sales_assignment_rule_tenant_demo_key', ['tenantId', 'demoKey'])
export class SalesAssignmentRuleEntity extends EntityRelationalHelper {
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

  @Column({ type: 'enum', enum: AssignmentRuleType })
  type: AssignmentRuleType;

  @Column({ type: String, length: 120 })
  label: string;

  @Column({ type: String, length: 500 })
  description: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
