import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
import { BranchEntity } from '../../../../../branches/infrastructure/persistence/relational/entities/branch.entity';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { VehicleBodyTypeEntity } from './vehicle-body-type.entity';
import { VehicleBrandEntity } from './vehicle-brand.entity';
import { VehicleEngineEntity } from './vehicle-engine.entity';
import { VehicleGenerationEntity } from './vehicle-generation.entity';
import { VehicleModelEntity } from './vehicle-model.entity';
import { VehicleTrimEntity } from './vehicle-trim.entity';
import { VehicleDocumentEntity } from './vehicle-document.entity';
import { VehicleMediaEntity } from './vehicle-media.entity';

export enum VehicleListingType {
  Sale = 'sale',
  Rental = 'rental',
  Auction = 'auction',
  Lease = 'lease',
  DirectImport = 'direct_import',
  Regular = 'regular',
  Other = 'other',
}

export enum VehicleStatus {
  Available = 'available',
  Reserved = 'reserved',
  Rented = 'rented',
  Leased = 'leased',
  Maintenance = 'maintenance',
  Sold = 'sold',
  Auctioned = 'auctioned',
  Draft = 'draft',
  Inactive = 'inactive',
}

@Entity({
  name: 'vehicle',
})
@Unique('UQ_vehicle_tenant_vin', ['tenant', 'vin'])
@Unique('UQ_vehicle_tenant_plate', ['tenant', 'plateNumber'])
export class VehicleEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenantId' })
  tenant: Relation<TenantEntity>;

  @ManyToOne(() => BranchEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'branchId' })
  branch?: Relation<BranchEntity> | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: Relation<UserEntity> | null;

  @ManyToOne(() => VehicleBrandEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'brandId' })
  brand?: Relation<VehicleBrandEntity> | null;

  @ManyToOne(() => VehicleModelEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'modelId' })
  modelCatalog?: Relation<VehicleModelEntity> | null;

  @ManyToOne(() => VehicleGenerationEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'generationId' })
  generation?: Relation<VehicleGenerationEntity> | null;

  @ManyToOne(() => VehicleTrimEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'trimId' })
  trim?: Relation<VehicleTrimEntity> | null;

  @ManyToOne(() => VehicleEngineEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'engineId' })
  engine?: Relation<VehicleEngineEntity> | null;

  @ManyToOne(() => VehicleBodyTypeEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'bodyTypeId' })
  bodyTypeCatalog?: Relation<VehicleBodyTypeEntity> | null;

  @Index()
  @Column({ type: String })
  make: string;

  @Index()
  @Column({ type: String })
  model: string;

  @Index()
  @Column({ type: 'int', nullable: true })
  year?: number | null;

  @Column({ type: String, nullable: true })
  bodyType?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  vin?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  plateNumber?: string | null;

  @Column({ type: 'int', default: 0 })
  mileage: number;

  @Column({ type: String, nullable: true })
  condition?: string | null;

  @Index()
  @Column({ default: VehicleListingType.Sale })
  listingType: VehicleListingType;

  @Index()
  @Column({ default: VehicleStatus.Available })
  status: VehicleStatus;

  @Column({ type: 'numeric', precision: 14, scale: 2, nullable: true })
  price?: string | null;

  @Column({ type: String, nullable: true })
  location?: string | null;

  @Column({ type: String, nullable: true })
  exteriorColor?: string | null;

  @Column({ type: String, nullable: true })
  interiorColor?: string | null;

  @Column({ type: String, nullable: true })
  title?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  engineDetails?: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  gearboxDetails?: Record<string, unknown> | null;

  @Column({ type: String, nullable: true })
  drivetrain?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  categorizedFeatures?: Record<string, string[]> | null;

  @Column({ type: 'jsonb', nullable: true })
  flaws?: unknown[] | null;

  @Column({ type: 'jsonb', nullable: true })
  listedOnBehalfOf?: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  saleOptions?: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  auctionOptions?: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  rentalOptions?: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  media?: unknown[] | null;

  @Column({ type: 'jsonb', nullable: true })
  highlights?: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  equipment?: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  modifications?: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  videoLinks?: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  backwardCompatibility?: Record<string, unknown> | null;

  @OneToMany(() => VehicleMediaEntity, (media) => media.vehicle)
  mediaAssets?: Relation<VehicleMediaEntity[]>;

  @OneToMany(() => VehicleDocumentEntity, (document) => document.vehicle)
  documents?: Relation<VehicleDocumentEntity[]>;

  @Index()
  @Column({ default: true })
  isActive: boolean;

  @Index()
  @Column({ type: String, length: 64, nullable: true })
  listingSlug?: string | null;

  @Column({ type: 'int', default: 0 })
  shareLinkClickCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
