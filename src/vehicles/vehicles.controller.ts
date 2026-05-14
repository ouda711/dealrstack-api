import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
  Request,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import { CreateVehicleDocumentDto } from './dto/create-vehicle-document.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreateVehicleMediaDto } from './dto/create-vehicle-media.dto';
import { UpdateVehicleDocumentDto } from './dto/update-vehicle-document.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleAttachmentPresignDto } from './dto/vehicle-attachment-presign.dto';
import {
  VehicleAttachmentPresignResponseDto,
  VehicleAttachmentUploadResponseDto,
} from './dto/vehicle-attachment-upload-response.dto';
import { VehicleAttachmentUploadKind } from './dto/vehicle-attachment-upload-kind.enum';
import { VehicleBodyTypeEntity } from './infrastructure/persistence/relational/entities/vehicle-body-type.entity';
import { VehicleBrandEntity } from './infrastructure/persistence/relational/entities/vehicle-brand.entity';
import { VehicleEngineEntity } from './infrastructure/persistence/relational/entities/vehicle-engine.entity';
import { VehicleDocumentEntity } from './infrastructure/persistence/relational/entities/vehicle-document.entity';
import { VehicleGenerationEntity } from './infrastructure/persistence/relational/entities/vehicle-generation.entity';
import { VehicleMediaEntity } from './infrastructure/persistence/relational/entities/vehicle-media.entity';
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

  @ApiCreatedResponse({
    type: VehicleAttachmentPresignResponseDto,
  })
  @ApiOperation({
    summary: 'Presign a vehicle attachment upload (S3 presigned driver only)',
    description:
      'Returns a short-lived PUT URL and the public file URL to store on the vehicle after upload. Requires FILE_DRIVER=s3-presigned.',
  })
  @ApiBody({ type: VehicleAttachmentPresignDto })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post(':id/attachments/presign')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.CREATED)
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
  presignVehicleAttachment(
    @Param('tenantId') tenantId: number,
    @Param('id') id: VehicleEntity['id'],
    @Body() dto: VehicleAttachmentPresignDto,
    @Request() request,
  ): Promise<VehicleAttachmentPresignResponseDto> {
    return this.vehiclesService.presignVehicleAttachment(
      tenantId,
      id,
      dto,
      request.user,
    );
  }

  @ApiCreatedResponse({
    type: VehicleAttachmentUploadResponseDto,
  })
  @ApiOperation({
    summary: 'Upload a vehicle attachment (local file driver only)',
    description:
      'Multipart upload stored under ./files and served via GET /api/v1/files/:path. Requires FILE_DRIVER=local. Use kind=gallery for images or kind=document for PDFs.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiQuery({
    name: 'kind',
    enum: VehicleAttachmentUploadKind,
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  @SerializeOptions({
    groups: ['me'],
  })
  @Post(':id/attachments')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.CREATED)
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
  uploadVehicleAttachment(
    @Param('tenantId') tenantId: number,
    @Param('id') id: VehicleEntity['id'],
    @Query('kind', new ParseEnumPipe(VehicleAttachmentUploadKind))
    kind: VehicleAttachmentUploadKind,
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
  ): Promise<VehicleAttachmentUploadResponseDto> {
    return this.vehiclesService.uploadVehicleAttachmentMultipart(
      tenantId,
      id,
      kind,
      file,
      request.user,
    );
  }

  @ApiCreatedResponse({
    type: VehicleMediaEntity,
  })
  @ApiOperation({
    summary: 'Add gallery media to a vehicle',
  })
  @ApiBody({
    type: CreateVehicleMediaDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post(':id/media')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.CREATED)
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
  addVehicleMedia(
    @Param('tenantId') tenantId: number,
    @Param('id') id: VehicleEntity['id'],
    @Body() dto: CreateVehicleMediaDto,
    @Request() request,
  ): Promise<VehicleMediaEntity> {
    return this.vehiclesService.addVehicleMedia(
      tenantId,
      id,
      dto,
      request.user,
    );
  }

  @ApiOperation({
    summary: 'Remove gallery media from a vehicle',
  })
  @ApiNoContentResponse({
    description: 'Media removed.',
  })
  @Delete(':id/media/:mediaId')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @ApiParam({
    name: 'mediaId',
    type: Number,
    required: true,
  })
  removeVehicleMedia(
    @Param('tenantId') tenantId: number,
    @Param('id') id: VehicleEntity['id'],
    @Param('mediaId') mediaId: VehicleMediaEntity['id'],
    @Request() request,
  ): Promise<void> {
    return this.vehiclesService.removeVehicleMedia(
      tenantId,
      id,
      mediaId,
      request.user,
    );
  }

  @ApiCreatedResponse({
    type: VehicleDocumentEntity,
  })
  @ApiOperation({
    summary: 'Add a compliance document to a vehicle',
  })
  @ApiBody({
    type: CreateVehicleDocumentDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post(':id/documents')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.CREATED)
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
  addVehicleDocument(
    @Param('tenantId') tenantId: number,
    @Param('id') id: VehicleEntity['id'],
    @Body() dto: CreateVehicleDocumentDto,
    @Request() request,
  ): Promise<VehicleDocumentEntity> {
    return this.vehiclesService.addVehicleDocument(
      tenantId,
      id,
      dto,
      request.user,
    );
  }

  @ApiOkResponse({
    type: VehicleDocumentEntity,
  })
  @ApiOperation({
    summary: 'Update a vehicle compliance document',
  })
  @ApiBody({
    type: UpdateVehicleDocumentDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch(':id/documents/:documentId')
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
  @ApiParam({
    name: 'documentId',
    type: Number,
    required: true,
  })
  updateVehicleDocument(
    @Param('tenantId') tenantId: number,
    @Param('id') id: VehicleEntity['id'],
    @Param('documentId') documentId: VehicleDocumentEntity['id'],
    @Body() dto: UpdateVehicleDocumentDto,
    @Request() request,
  ): Promise<VehicleDocumentEntity> {
    return this.vehiclesService.updateVehicleDocument(
      tenantId,
      id,
      documentId,
      dto,
      request.user,
    );
  }

  @ApiOperation({
    summary: 'Remove a vehicle compliance document',
  })
  @ApiNoContentResponse({
    description: 'Document removed.',
  })
  @Delete(':id/documents/:documentId')
  @RequirePermissions('vehicles.manage')
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @ApiParam({
    name: 'documentId',
    type: Number,
    required: true,
  })
  removeVehicleDocument(
    @Param('tenantId') tenantId: number,
    @Param('id') id: VehicleEntity['id'],
    @Param('documentId') documentId: VehicleDocumentEntity['id'],
    @Request() request,
  ): Promise<void> {
    return this.vehiclesService.removeVehicleDocument(
      tenantId,
      id,
      documentId,
      request.user,
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
