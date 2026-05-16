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
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { MessageDirection } from '../../../../domain/sales.enums';
import { SalesConversationEntity } from './sales-conversation.entity';

@Entity({ name: 'sales_message' })
@Unique('UQ_sales_message_demo_key', ['conversationId', 'demoKey'])
export class SalesMessageEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  conversationId: number;

  @ManyToOne(
    () => SalesConversationEntity,
    (conversation) => conversation.messages,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'conversationId' })
  conversation: SalesConversationEntity;

  @Column({ type: String, length: 64, nullable: true })
  demoKey?: string | null;

  @Column({ type: 'enum', enum: MessageDirection })
  direction: MessageDirection;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'timestamptz' })
  sentAt: Date;

  @Column({ default: false })
  isTemplate: boolean;

  @Column({ type: String, length: 20, nullable: true })
  mediaType?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
