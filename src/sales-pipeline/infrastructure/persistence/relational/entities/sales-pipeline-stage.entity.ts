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
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SalesPipelineEntity } from './sales-pipeline.entity';

@Entity({
  name: 'sales_pipeline_stage',
})
@Unique('UQ_sales_pipeline_stage_pipeline_key', ['pipelineId', 'stageKey'])
export class SalesPipelineStageEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SalesPipelineEntity, (pipeline) => pipeline.stages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pipelineId' })
  pipeline: SalesPipelineEntity;

  @Index()
  @Column({ type: 'int' })
  pipelineId: number;

  @Index()
  @Column({ type: String, length: 50 })
  stageKey: string;

  @Column({ type: String, length: 100 })
  label: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: String, length: 20, default: 'default' })
  color: string;

  @Column({ default: false })
  isWonStage: boolean;

  @Column({ default: false })
  isLostStage: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
