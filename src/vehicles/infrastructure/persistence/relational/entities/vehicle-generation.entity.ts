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
  name: 'vehicle_generation',
})
@Unique('UQ_vehicle_generation_model_slug', ['model', 'slug'])
export class VehicleGenerationEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  name: string;

  @Index()
  @Column({ type: String })
  slug: string;

  @ManyToOne(() => VehicleModelEntity, (model) => model.generations, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model: Relation<VehicleModelEntity>;

  @Column({ type: 'int', nullable: true })
  startYear?: number | null;

  @Column({ type: 'int', nullable: true })
  endYear?: number | null;

  @Column({ type: String, nullable: true })
  platformCode?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
