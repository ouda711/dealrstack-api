import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VehicleBodyTypeEntity } from './vehicle-body-type.entity';
import { VehicleBrandEntity } from './vehicle-brand.entity';
import { VehicleEngineEntity } from './vehicle-engine.entity';
import { VehicleGenerationEntity } from './vehicle-generation.entity';
import { VehicleTrimEntity } from './vehicle-trim.entity';

@Entity({
  name: 'vehicle_model',
})
@Unique('UQ_vehicle_model_brand_slug', ['brand', 'slug'])
export class VehicleModelEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  name: string;

  @Index()
  @Column({ type: String })
  slug: string;

  @ManyToOne(() => VehicleBrandEntity, (brand) => brand.models, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand: Relation<VehicleBrandEntity>;

  @ManyToOne(() => VehicleBodyTypeEntity, (bodyType) => bodyType.models, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'bodyTypeId' })
  bodyType?: Relation<VehicleBodyTypeEntity> | null;

  @Column({ type: 'int', nullable: true })
  productionStartYear?: number | null;

  @Column({ type: 'int', nullable: true })
  productionEndYear?: number | null;

  @OneToMany(() => VehicleGenerationEntity, (generation) => generation.model)
  generations: Relation<VehicleGenerationEntity[]>;

  @OneToMany(() => VehicleTrimEntity, (trim) => trim.model)
  trims: Relation<VehicleTrimEntity[]>;

  @OneToMany(() => VehicleEngineEntity, (engine) => engine.model)
  engines: Relation<VehicleEngineEntity[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
