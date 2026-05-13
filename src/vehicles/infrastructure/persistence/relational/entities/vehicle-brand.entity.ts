import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VehicleEngineEntity } from './vehicle-engine.entity';
import { VehicleModelEntity } from './vehicle-model.entity';

@Entity({
  name: 'vehicle_brand',
})
export class VehicleBrandEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, unique: true })
  name: string;

  @Index()
  @Column({ type: String, unique: true })
  slug: string;

  @Column({ type: String, nullable: true })
  logoUrl?: string | null;

  @Column({ type: 'int', nullable: true })
  foundingYear?: number | null;

  @Column({ type: String, nullable: true })
  countryOfOrigin?: string | null;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isLuxuryBrand: boolean;

  @Column({ type: 'int', nullable: true })
  marketRank?: number | null;

  @OneToMany(() => VehicleModelEntity, (model) => model.brand)
  models: Relation<VehicleModelEntity[]>;

  @OneToMany(() => VehicleEngineEntity, (engine) => engine.brand)
  engines: Relation<VehicleEngineEntity[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
