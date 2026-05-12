import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import { NullableType } from '../utils/types/nullable.type';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './domain/branch';

@ApiBearerAuth()
@RequirePermissions('settings.manage')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Branches')
@Controller({
  path: 'tenants/:tenantId/branches',
  version: '1',
})
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @ApiCreatedResponse({
    type: Branch,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  create(
    @Param('tenantId') tenantId: number,
    @Body() createBranchDto: CreateBranchDto,
  ): Promise<Branch> {
    return this.branchesService.create(tenantId, createBranchDto);
  }

  @ApiOkResponse({
    type: [Branch],
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  findAll(@Param('tenantId') tenantId: number): Promise<Branch[]> {
    return this.branchesService.findByTenantId(tenantId);
  }

  @ApiOkResponse({
    type: Branch,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  findOne(
    @Param('tenantId') tenantId: number,
    @Param('id') id: Branch['id'],
  ): Promise<NullableType<Branch>> {
    return this.branchesService.findByTenantIdAndId(tenantId, id);
  }

  @ApiOkResponse({
    type: Branch,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  update(
    @Param('tenantId') tenantId: number,
    @Param('id') id: Branch['id'],
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<Branch | null> {
    return this.branchesService.update(tenantId, id, updateBranchDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('tenantId') tenantId: number,
    @Param('id') id: Branch['id'],
  ): Promise<void> {
    return this.branchesService.remove(tenantId, id);
  }
}
