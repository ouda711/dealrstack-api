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
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({ name: 'tenant_whatsapp_integration' })
@Unique('UQ_tenant_whatsapp_integration_tenant', ['tenantId'])
@Unique('UQ_tenant_whatsapp_integration_phone_number_id', ['phoneNumberId'])
export class TenantWhatsAppIntegrationEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  tenantId: number;

  @ManyToOne(() => TenantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Column({ type: String, length: 64 })
  phoneNumberId: string;

  @Column({ type: String, length: 64, nullable: true })
  wabaId?: string | null;

  @Column({ type: String, length: 32, nullable: true })
  displayPhoneNumber?: string | null;

  @Column({ type: 'text' })
  accessToken: string;

  @Column({ default: true })
  isEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
