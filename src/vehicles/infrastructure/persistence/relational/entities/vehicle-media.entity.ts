import { Exclude } from 'class-transformer';
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
import { VehicleEntity } from './vehicle.entity';

export enum VehicleMediaKind {
  Image = 'image',
  Video = 'video',
}

@Entity({
  name: 'vehicle_media',
})
export class VehicleMediaEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.mediaAssets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Relation<VehicleEntity>;

  @Index()
  @Column({ type: String })
  kind: VehicleMediaKind;

  @Column({ type: String, length: 2048 })
  url: string;

  @Column({ type: String, nullable: true })
  caption?: string | null;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
