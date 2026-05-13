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
  Query,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleBodyTypeEntity } from './infrastructure/persistence/relational/entities/vehicle-body-type.entity';
import { VehicleBrandEntity } from './infrastructure/persistence/relational/entities/vehicle-brand.entity';
import { VehicleEngineEntity } from './infrastructure/persistence/relational/entities/vehicle-engine.entity';
import { VehicleGenerationEntity } from './infrastructure/persistence/relational/entities/vehicle-generation.entity';
import { VehicleModelEntity } from './infrastructure/persistence/relational/entities/vehicle-model.entity';
import { VehicleTrimEntity } from './infrastructure/persistence/relational/entities/vehicle-trim.entity';
import { VehicleEntity } from './infrastructure/persistence/relational/entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Vehicles')
@Controller({
  path: 'tenants/:tenantId/vehicles',
  version: '1',
})
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiCreatedResponse({
    type: VehicleEntity,
  })
  @ApiOperation({
    summary: 'Create a vehicle inventory record',
    description:
      'Creates a vehicle under the tenant workspace with optional branch, assigned user, and structured sale/rental/auction details.',
  })
  @ApiBody({
    type: CreateVehicleDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post()
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  create(
    @Param('tenantId') tenantId: number,
    @Body() createVehicleDto: CreateVehicleDto,
    @Request() request,
  ): Promise<VehicleEntity> {
    return this.vehiclesService.create(
      tenantId,
      createVehicleDto,
      request.user,
    );
  }

  @ApiOkResponse({
    type: [VehicleEntity],
  })
  @ApiOperation({
    summary: 'List tenant vehicle inventory',
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Get()
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  findAll(@Param('tenantId') tenantId: number): Promise<VehicleEntity[]> {
    return this.vehiclesService.findByTenantId(tenantId);
  }

  @ApiOkResponse({
    type: [VehicleBrandEntity],
  })
  @ApiOperation({
    summary: 'List vehicle catalog brands',
  })
  @Get('catalog/brands')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  findCatalogBrands(): Promise<VehicleBrandEntity[]> {
    return this.vehiclesService.findCatalogBrands();
  }

  @ApiOkResponse({
    type: [VehicleModelEntity],
  })
  @ApiOperation({
    summary: 'List vehicle catalog models',
  })
  @ApiQuery({
    name: 'brandId',
    required: false,
    type: Number,
  })
  @Get('catalog/models')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  findCatalogModels(
    @Query('brandId') brandId?: number,
  ): Promise<VehicleModelEntity[]> {
    return this.vehiclesService.findCatalogModels(
      brandId ? Number(brandId) : undefined,
    );
  }

  @ApiOkResponse({
    type: [VehicleBodyTypeEntity],
  })
  @ApiOperation({
    summary: 'List vehicle catalog body types',
  })
  @Get('catalog/body-types')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  findCatalogBodyTypes(): Promise<VehicleBodyTypeEntity[]> {
    return this.vehiclesService.findCatalogBodyTypes();
  }

  @ApiOkResponse({
    type: [VehicleGenerationEntity],
  })
  @ApiOperation({
    summary: 'List vehicle catalog generations',
  })
  @ApiQuery({
    name: 'modelId',
    required: false,
    type: Number,
  })
  @Get('catalog/generations')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  findCatalogGenerations(
    @Query('modelId') modelId?: number,
  ): Promise<VehicleGenerationEntity[]> {
    return this.vehiclesService.findCatalogGenerations(
      modelId ? Number(modelId) : undefined,
    );
  }

  @ApiOkResponse({
    type: [VehicleTrimEntity],
  })
  @ApiOperation({
    summary: 'List vehicle catalog trims',
  })
  @ApiQuery({
    name: 'modelId',
    required: false,
    type: Number,
  })
  @Get('catalog/trims')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  findCatalogTrims(
    @Query('modelId') modelId?: number,
  ): Promise<VehicleTrimEntity[]> {
    return this.vehiclesService.findCatalogTrims(
      modelId ? Number(modelId) : undefined,
    );
  }

  @ApiOkResponse({
    type: [VehicleEngineEntity],
  })
  @ApiOperation({
    summary: 'List vehicle catalog engines',
  })
  @ApiQuery({
    name: 'modelId',
    required: false,
    type: Number,
  })
  @Get('catalog/engines')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
  @HttpCode(HttpStatus.OK)
  findCatalogEngines(
    @Query('modelId') modelId?: number,
  ): Promise<VehicleEngineEntity[]> {
    return this.vehiclesService.findCatalogEngines(
      modelId ? Number(modelId) : undefined,
    );
  }

  @ApiOkResponse({
    type: VehicleEntity,
  })
  @ApiOperation({
    summary: 'Get a tenant vehicle',
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Get(':id')
  @RequirePermissions('vehicles.view', 'vehicles.manage')
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
    @Param('id') id: VehicleEntity['id'],
  ): Promise<VehicleEntity> {
    return this.vehiclesService.findByTenantIdAndId(tenantId, id);
  }

  @ApiOkResponse({
    type: VehicleEntity,
  })
  @ApiOperation({
    summary: 'Update a tenant vehicle',
  })
  @ApiBody({
    type: UpdateVehicleDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch(':id')
  @RequirePermissions('vehicles.manage')
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
    @Param('id') id: VehicleEntity['id'],
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Request() request,
  ): Promise<VehicleEntity> {
    return this.vehiclesService.update(
      tenantId,
      id,
      updateVehicleDto,
      request.user,
    );
  }

  @ApiOperation({
    summary: 'Delete a tenant vehicle',
  })
  @ApiNoContentResponse({
    description: 'Vehicle deleted successfully.',
  })
  @Delete(':id')
  @RequirePermissions('vehicles.manage')
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
    @Param('id') id: VehicleEntity['id'],
    @Request() request,
  ): Promise<void> {
    return this.vehiclesService.remove(tenantId, id, request.user);
  }
}
