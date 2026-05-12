import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'tenant',
})
export class TenantEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  name: string;

  @Index({ unique: true })
  @Column({ type: String })
  slug: string;

  @Index()
  @Column({ type: String })
  country: string;

  @Column({ type: String })
  timezone: string;

  @Column({ type: String })
  currency: string;

  @Column({ type: String, nullable: true })
  phone?: string | null;

  @Column({ type: String, nullable: true })
  email?: string | null;

  @Column({ type: String, nullable: true })
  website?: string | null;

  @Index()
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
