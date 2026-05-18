import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesActivityEntity } from './entities/sales-activity.entity';
import { SalesAssignmentRuleEntity } from './entities/sales-assignment-rule.entity';
import { SalesConversationEntity } from './entities/sales-conversation.entity';
import { SalesDealEntity } from './entities/sales-deal.entity';
import { SalesFollowUpRuleEntity } from './entities/sales-follow-up-rule.entity';
import { SalesLeadEntity } from './entities/sales-lead.entity';
import { SalesMessageEntity } from './entities/sales-message.entity';
import { SalesNotificationEntity } from './entities/sales-notification.entity';
import { SalesLeadCaptureEventEntity } from './entities/sales-lead-capture-event.entity';
import { SalesAppointmentEntity } from './entities/sales-appointment.entity';
import { SalesPushSubscriptionEntity } from './entities/sales-push-subscription.entity';
import { VehicleEntity } from '../../../../vehicles/infrastructure/persistence/relational/entities/vehicle.entity';
import { VehicleMediaEntity } from '../../../../vehicles/infrastructure/persistence/relational/entities/vehicle-media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SalesLeadEntity,
      SalesDealEntity,
      VehicleEntity,
      VehicleMediaEntity,
      SalesConversationEntity,
      SalesMessageEntity,
      SalesActivityEntity,
      SalesNotificationEntity,
      SalesAssignmentRuleEntity,
      SalesFollowUpRuleEntity,
      SalesLeadCaptureEventEntity,
      SalesAppointmentEntity,
      SalesPushSubscriptionEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class RelationalSalesPersistenceModule {}
