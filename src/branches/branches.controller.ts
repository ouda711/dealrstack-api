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
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
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
  @ApiOperation({
    summary: 'Create a branch for a tenant workspace',
    description:
      'Creates a sales branch/location under the tenant in the route. Requires settings.manage in that tenant context.',
  })
  @ApiBody({
    type: CreateBranchDto,
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
    description:
      'Tenant workspace ID. Must match a tenant the user can manage.',
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
  @ApiOperation({
    summary: 'List branches for a tenant workspace',
    description:
      'Returns sales branches for the tenant in the route. Requires settings.manage in that tenant context.',
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
    description:
      'Tenant workspace ID. Must match a tenant the user can manage.',
  })
  findAll(@Param('tenantId') tenantId: number): Promise<Branch[]> {
    return this.branchesService.findByTenantId(tenantId);
  }

  @ApiOkResponse({
    type: Branch,
  })
  @ApiOperation({
    summary: 'Get a tenant branch',
    description:
      'Returns one branch scoped to the tenant in the route. Requires settings.manage in that tenant context.',
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
    description:
      'Tenant workspace ID. Must match a tenant the user can manage.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Branch ID scoped to the tenant workspace.',
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
  @ApiOperation({
    summary: 'Update a tenant branch',
    description:
      'Updates one branch scoped to the tenant in the route. Requires settings.manage in that tenant context.',
  })
  @ApiBody({
    type: UpdateBranchDto,
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
    description:
      'Tenant workspace ID. Must match a tenant the user can manage.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Branch ID scoped to the tenant workspace.',
  })
  update(
    @Param('tenantId') tenantId: number,
    @Param('id') id: Branch['id'],
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<Branch | null> {
    return this.branchesService.update(tenantId, id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a tenant branch',
    description:
      'Soft deletes one branch scoped to the tenant in the route. Requires settings.manage in that tenant context.',
  })
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
    description:
      'Tenant workspace ID. Must match a tenant the user can manage.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Branch ID scoped to the tenant workspace.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('tenantId') tenantId: number,
    @Param('id') id: Branch['id'],
  ): Promise<void> {
    return this.branchesService.remove(tenantId, id);
  }
}
