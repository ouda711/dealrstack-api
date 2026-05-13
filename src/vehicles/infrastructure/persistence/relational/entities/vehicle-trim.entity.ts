import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VehicleModelEntity } from './vehicle-model.entity';

@Entity({
  name: 'vehicle_trim',
})
@Unique('UQ_vehicle_trim_model_slug', ['model', 'slug'])
export class VehicleTrimEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  name: string;

  @Index()
  @Column({ type: String })
  slug: string;

  @ManyToOne(() => VehicleModelEntity, (model) => model.trims, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: Relation<VehicleModelEntity>;

  @Column({ type: String, nullable: true })
  code?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  specifications?: Record<string, unknown> | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
