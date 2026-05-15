import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VehicleMarketingThreadEntity } from './vehicle-marketing-thread.entity';

export type VehicleMarketingMessageRole = 'user' | 'assistant';

@Entity({ name: 'vehicle_marketing_message' })
export class VehicleMarketingMessageEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VehicleMarketingThreadEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'threadId' })
  @Index('IDX_vehicle_marketing_message_threadId')
  thread: Relation<VehicleMarketingThreadEntity>;

  @Column({ type: 'varchar', length: 16 })
  role: VehicleMarketingMessageRole;

  @Column({ type: 'text', default: '' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  artifact?: Record<string, unknown> | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
