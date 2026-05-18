import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from '../../../../../tenants/infrastructure/persistence/relational/entities/tenant.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { VehicleEntity } from '../../../../../vehicles/infrastructure/persistence/relational/entities/vehicle.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import {
  SalesAppointmentStatus,
  SalesAppointmentType,
} from '../../../../domain/sales.enums';
import { SalesDealEntity } from './sales-deal.entity';
import { SalesLeadEntity } from './sales-lead.entity';

@Entity({ name: 'sales_appointment' })
@Unique('UQ_sales_appointment_tenant_demo_key', ['tenantId', 'demoKey'])
export class SalesAppointmentEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  tenantId: number;

  @ManyToOne(() => TenantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column({ type: String, length: 64, nullable: true })
  demoKey?: string | null;

  @Index()
  @Column({ type: 'int' })
  leadId: number;

  @ManyToOne(() => SalesLeadEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leadId' })
  lead: SalesLeadEntity;

  @Column({ type: 'int', nullable: true })
  dealId?: number | null;

  @ManyToOne(() => SalesDealEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'dealId' })
  deal?: SalesDealEntity | null;

  @Column({ type: 'int', nullable: true })
  vehicleId?: number | null;

  @ManyToOne(() => VehicleEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'vehicleId' })
  vehicle?: VehicleEntity | null;

  @Column({ type: 'int', nullable: true })
  assignedUserId?: number | null;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignedUserId' })
  assignedUser?: UserEntity | null;

  @Column({ type: 'enum', enum: SalesAppointmentType })
  type: SalesAppointmentType;

  @Column({
    type: 'enum',
    enum: SalesAppointmentStatus,
    default: SalesAppointmentStatus.Scheduled,
  })
  status: SalesAppointmentStatus;

  @Index()
  @Column({ type: 'timestamptz' })
  scheduledAt: Date;

  @Column({ type: 'int', default: 60 })
  durationMinutes: number;

  @Column({ type: String, length: 255, nullable: true })
  location?: string | null;

  @Column({ type: String, length: 1000, nullable: true })
  notes?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
