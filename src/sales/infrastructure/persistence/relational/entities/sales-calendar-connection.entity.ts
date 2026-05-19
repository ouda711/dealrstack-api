import {
  Column,
  CreateDateColumn,
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
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SalesCalendarProvider } from '../../../../domain/sales.enums';

@Entity({ name: 'sales_calendar_connection' })
@Unique('UQ_sales_calendar_connection_tenant_user_provider', [
  'tenantId',
  'userId',
  'provider',
])
export class SalesCalendarConnectionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  tenantId: number;

  @ManyToOne(() => TenantEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantEntity;

  @Index()
  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'enum', enum: SalesCalendarProvider })
  provider: SalesCalendarProvider;

  @Column({ type: String, length: 512, nullable: true })
  calendarId?: string | null;

  @Column({ type: 'text' })
  accessToken: string;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  tokenExpiresAt?: Date | null;

  @Column({ type: 'boolean', default: true })
  syncEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
