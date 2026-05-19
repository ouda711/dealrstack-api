import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from '../ai/ai.module';
import { AccessModule } from '../access/access.module';
import { SalesLeadEntity } from '../sales/infrastructure/persistence/relational/entities/sales-lead.entity';
import { GrowthController } from './growth.controller';
import { GrowthService } from './growth.service';
import { PermissionsGuard } from '../access/permissions.guard';

@Module({
  imports: [
    AiModule,
    AccessModule,
    TypeOrmModule.forFeature([SalesLeadEntity]),
  ],
  controllers: [GrowthController],
  providers: [GrowthService, PermissionsGuard],
  exports: [GrowthService],
})
export class GrowthModule {}
