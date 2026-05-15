import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VehicleEntity } from './vehicle.entity';

@Entity({
  name: 'vehicle_listing_view',
})
export class VehicleListingViewEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VehicleEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Relation<VehicleEntity>;

  @Index()
  @Column({ type: String, length: 64, default: 'direct' })
  source: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;
}
