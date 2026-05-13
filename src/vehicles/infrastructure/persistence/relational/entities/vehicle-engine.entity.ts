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
import { VehicleBrandEntity } from './vehicle-brand.entity';
import { VehicleModelEntity } from './vehicle-model.entity';

@Entity({
  name: 'vehicle_engine',
})
@Unique('UQ_vehicle_engine_brand_model_slug', ['brand', 'model', 'slug'])
export class VehicleEngineEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  name: string;

  @Index()
  @Column({ type: String })
  slug: string;

  @ManyToOne(() => VehicleBrandEntity, (brand) => brand.engines, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: Relation<VehicleBrandEntity>;

  @ManyToOne(() => VehicleModelEntity, (model) => model.engines, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'modelId' })
  model?: Relation<VehicleModelEntity> | null;

  @Column({ type: String, nullable: true })
  type?: string | null;

  @Column({ type: 'numeric', precision: 5, scale: 1, nullable: true })
  displacement?: string | null;

  @Column({ type: 'int', nullable: true })
  horsepower?: number | null;

  @Column({ type: 'int', nullable: true })
  torque?: number | null;

  @Column({ type: String, nullable: true })
  transmission?: string | null;

  @Column({ type: 'int', nullable: true })
  gears?: number | null;

  @Column({ type: String, nullable: true })
  drivetrain?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
