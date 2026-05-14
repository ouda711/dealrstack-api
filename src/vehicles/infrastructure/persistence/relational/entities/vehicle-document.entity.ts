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

export enum VehicleDocumentType {
  Registration = 'registration',
  Inspection = 'inspection',
  Insurance = 'insurance',
  Title = 'title',
  Ownership = 'ownership',
  Other = 'other',
}

@Entity({
  name: 'vehicle_document',
})
export class VehicleDocumentEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Relation<VehicleEntity>;

  @Index()
  @Column({ type: String })
  documentType: VehicleDocumentType;

  @Column({ type: String, length: 255 })
  title: string;

  @Column({ type: String, length: 2048 })
  url: string;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt?: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
