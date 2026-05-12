import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchRepository } from '../branch.repository';
import { BranchEntity } from './entities/branch.entity';
import { BranchesRelationalRepository } from './repositories/branch.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity])],
  providers: [
    {
      provide: BranchRepository,
      useClass: BranchesRelationalRepository,
    },
  ],
  exports: [BranchRepository],
})
export class RelationalBranchPersistenceModule {}
