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
import { VehicleModelEntity } from './vehicle-model.entity';

@Entity({
  name: 'vehicle_body_type',
})
export class VehicleBodyTypeEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, unique: true })
  name: string;

  @Index()
  @Column({ type: String, unique: true })
  slug: string;

  @Column({ type: String, nullable: true })
  code?: string | null;

  @Column({ type: String, nullable: true })
  iconUrl?: string | null;

  @OneToMany(() => VehicleModelEntity, (model) => model.bodyType)
  models: Relation<VehicleModelEntity[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
