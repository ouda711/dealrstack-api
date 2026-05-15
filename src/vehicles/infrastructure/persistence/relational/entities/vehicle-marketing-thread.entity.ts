import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VehicleEntity } from './vehicle.entity';

@Entity({ name: 'vehicle_marketing_thread' })
export class VehicleMarketingThreadEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VehicleEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  @Index('IDX_vehicle_marketing_thread_vehicleId')
  vehicle: Relation<VehicleEntity>;

  @ManyToOne(() => VehicleMarketingThreadEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parentThreadId' })
  @Index('IDX_vehicle_marketing_thread_parentThreadId')
  parentThread?: Relation<VehicleMarketingThreadEntity> | null;

  @RelationId((thread: VehicleMarketingThreadEntity) => thread.parentThread)
  parentThreadId?: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
