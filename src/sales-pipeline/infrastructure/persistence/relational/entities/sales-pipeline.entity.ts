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
  UpdateDateColumn,
} from 'typeorm';
import { BranchEntity } from '../../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SalesPipelineStageEntity } from './sales-pipeline-stage.entity';

@Entity({
  name: 'sales_pipeline',
})
export class SalesPipelineEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant?: TenantEntity | null;

  @Index()
  @Column({ type: 'int', nullable: true })
  tenantId?: number | null;

  @ManyToOne(() => BranchEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branchId' })
  branch?: BranchEntity | null;

  @Index()
  @Column({ type: 'int', nullable: true })
  branchId?: number | null;

  @Index()
  @Column({ default: false })
  isSystemDefault: boolean;

  @OneToMany(() => SalesPipelineStageEntity, (stage) => stage.pipeline, {
    cascade: true,
  })
  stages: SalesPipelineStageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
