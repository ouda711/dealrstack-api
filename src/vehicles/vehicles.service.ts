import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionEntity } from '../access/infrastructure/persistence/relational/entities/role-permission.entity';
import {
  TenantMembershipEntity,
  TenantMembershipStatus,
} from '../access/infrastructure/persistence/relational/entities/tenant-membership.entity';
import { AuditTrailService } from '../audit-trail/audit-trail.service';
import { BranchEntity } from '../branches/infrastructure/persistence/relational/entities/branch.entity';
import { RoleEnum } from '../roles/roles.enum';
import { Tenant } from '../tenants/domain/tenant';
import { TenantsService } from '../tenants/tenants.service';
import { User } from '../users/domain/user';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleBodyTypeEntity } from './infrastructure/persistence/relational/entities/vehicle-body-type.entity';
import { VehicleBrandEntity } from './infrastructure/persistence/relational/entities/vehicle-brand.entity';
import { VehicleEngineEntity } from './infrastructure/persistence/relational/entities/vehicle-engine.entity';
import { VehicleGenerationEntity } from './infrastructure/persistence/relational/entities/vehicle-generation.entity';
import { VehicleModelEntity } from './infrastructure/persistence/relational/entities/vehicle-model.entity';
import { VehicleTrimEntity } from './infrastructure/persistence/relational/entities/vehicle-trim.entity';
import {
  VehicleEntity,
  VehicleListingType,
  VehicleStatus,
} from './infrastructure/persistence/relational/entities/vehicle.entity';

type VehicleActor = Pick<User, 'id' | 'role'>;
type ResolvedVehicleCatalog = {
  brand: VehicleBrandEntity;
  model: VehicleModelEntity;
  generation: VehicleGenerationEntity | null;
  trim: VehicleTrimEntity | null;
  engine: VehicleEngineEntity | null;
  bodyType: VehicleBodyTypeEntity | null;
};

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TenantMembershipEntity)
    private readonly tenantMembershipRepository: Repository<TenantMembershipEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(VehicleBrandEntity)
    private readonly vehicleBrandRepository: Repository<VehicleBrandEntity>,
    @InjectRepository(VehicleModelEntity)
    private readonly vehicleModelRepository: Repository<VehicleModelEntity>,
    @InjectRepository(VehicleGenerationEntity)
    private readonly vehicleGenerationRepository: Repository<VehicleGenerationEntity>,
    @InjectRepository(VehicleTrimEntity)
    private readonly vehicleTrimRepository: Repository<VehicleTrimEntity>,
    @InjectRepository(VehicleEngineEntity)
    private readonly vehicleEngineRepository: Repository<VehicleEngineEntity>,
    @InjectRepository(VehicleBodyTypeEntity)
    private readonly vehicleBodyTypeRepository: Repository<VehicleBodyTypeEntity>,
    private readonly tenantsService: TenantsService,
    private readonly auditTrailService: AuditTrailService,
  ) {}

  findCatalogBrands(): Promise<VehicleBrandEntity[]> {
    return this.vehicleBrandRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findCatalogModels(brandId?: number): Promise<VehicleModelEntity[]> {
    return this.vehicleModelRepository.find({
      where: brandId
        ? {
            brand: {
              id: brandId,
            },
          }
        : {},
      order: {
        name: 'ASC',
      },
    });
  }

  findCatalogBodyTypes(): Promise<VehicleBodyTypeEntity[]> {
    return this.vehicleBodyTypeRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findCatalogGenerations(modelId?: number): Promise<VehicleGenerationEntity[]> {
    return this.vehicleGenerationRepository.find({
      where: modelId
        ? {
            model: {
              id: modelId,
            },
          }
        : {},
      order: {
        startYear: 'DESC',
        name: 'ASC',
      },
    });
  }

  findCatalogTrims(modelId?: number): Promise<VehicleTrimEntity[]> {
    return this.vehicleTrimRepository.find({
      where: modelId
        ? {
            model: {
              id: modelId,
            },
          }
        : {},
      order: {
        name: 'ASC',
      },
    });
  }

  findCatalogEngines(modelId?: number): Promise<VehicleEngineEntity[]> {
    return this.vehicleEngineRepository.find({
      where: modelId
        ? {
            model: {
              id: modelId,
            },
          }
        : {},
      order: {
        name: 'ASC',
      },
    });
  }

  async create(
    tenantId: Tenant['id'],
    createVehicleDto: CreateVehicleDto,
    actor: VehicleActor,
  ): Promise<VehicleEntity> {
    await this.getTenantOrThrow(tenantId);
    const branch = await this.resolveBranch(
      Number(tenantId),
      createVehicleDto.branchId,
    );
    const catalog = await this.resolveVehicleCatalog(createVehicleDto);

    await this.ensureCanManageVehicleBranch(Number(tenantId), branch, actor);
    await this.ensureVinAndPlateAreAvailable(
      Number(tenantId),
      createVehicleDto.vin,
      createVehicleDto.plateNumber,
    );

    const assignedTo = await this.resolveAssignedUser(
      Number(tenantId),
      createVehicleDto.assignedToId,
    );
    const vehicle = await this.vehicleRepository.save(
      this.vehicleRepository.create({
        ...this.toVehiclePayload(createVehicleDto, catalog, true),
        tenant: {
          id: Number(tenantId),
        },
        branch,
        assignedTo,
        brand: catalog.brand,
        modelCatalog: catalog.model,
        generation: catalog.generation,
        trim: catalog.trim,
        engine: catalog.engine,
        bodyTypeCatalog: catalog.bodyType,
      }),
    );

    await this.auditTrailService.record({
      tenantId: Number(tenantId),
      branchId: vehicle.branch?.id,
      actor: {
        id: actor.id,
      },
      action: 'CREATE_VEHICLE',
      description: `vehicle ${this.getVehicleLabel(vehicle)} was created`,
      metadata: this.getVehicleAuditSnapshot(vehicle),
    });

    return vehicle;
  }

  async findByTenantId(tenantId: Tenant['id']): Promise<VehicleEntity[]> {
    await this.getTenantOrThrow(tenantId);

    return this.vehicleRepository.find({
      where: {
        tenant: {
          id: Number(tenantId),
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByTenantIdAndId(
    tenantId: Tenant['id'],
    id: VehicleEntity['id'],
  ): Promise<VehicleEntity> {
    await this.getTenantOrThrow(tenantId);

    return this.getVehicleOrThrow(tenantId, id);
  }

  async update(
    tenantId: Tenant['id'],
    id: VehicleEntity['id'],
    updateVehicleDto: UpdateVehicleDto,
    actor: VehicleActor,
  ): Promise<VehicleEntity> {
    await this.getTenantOrThrow(tenantId);
    const existingVehicle = await this.getVehicleOrThrow(tenantId, id);
    const nextBranch =
      updateVehicleDto.branchId !== undefined
        ? await this.resolveBranch(Number(tenantId), updateVehicleDto.branchId)
        : existingVehicle.branch || null;
    const catalog = await this.resolveVehicleCatalog(
      updateVehicleDto,
      existingVehicle,
    );

    await this.ensureCanManageVehicleBranch(
      Number(tenantId),
      existingVehicle.branch || null,
      actor,
    );

    if (
      Number(nextBranch?.id || 0) !== Number(existingVehicle.branch?.id || 0)
    ) {
      await this.ensureCanManageAllVehicleBranches(Number(tenantId), actor);
    }

    await this.ensureVinAndPlateAreAvailable(
      Number(tenantId),
      updateVehicleDto.vin,
      updateVehicleDto.plateNumber,
      id,
    );

    const assignedTo =
      updateVehicleDto.assignedToId !== undefined
        ? await this.resolveAssignedUser(
            Number(tenantId),
            updateVehicleDto.assignedToId,
          )
        : existingVehicle.assignedTo || null;
    const updatedVehicle = await this.vehicleRepository.save(
      this.vehicleRepository.create({
        ...existingVehicle,
        ...this.toVehiclePayload(updateVehicleDto, catalog),
        branch: nextBranch,
        assignedTo,
        brand: catalog.brand,
        modelCatalog: catalog.model,
        generation: catalog.generation,
        trim: catalog.trim,
        engine: catalog.engine,
        bodyTypeCatalog: catalog.bodyType,
      }),
    );
    const changes = this.getVehicleChangeDescriptions(
      existingVehicle,
      updatedVehicle,
    );

    if (changes.length) {
      await this.auditTrailService.record({
        tenantId: Number(tenantId),
        branchId: updatedVehicle.branch?.id,
        actor: {
          id: actor.id,
        },
        action:
          existingVehicle.status !== updatedVehicle.status
            ? 'UPDATE_VEHICLE_STATUS'
            : 'UPDATE_VEHICLE',
        description: changes.join('; '),
        metadata: {
          previous: this.getVehicleAuditSnapshot(existingVehicle),
          next: this.getVehicleAuditSnapshot(updatedVehicle),
        },
      });
    }

    return updatedVehicle;
  }

  async remove(
    tenantId: Tenant['id'],
    id: VehicleEntity['id'],
    actor: VehicleActor,
  ): Promise<void> {
    await this.getTenantOrThrow(tenantId);
    const vehicle = await this.getVehicleOrThrow(tenantId, id);

    await this.ensureCanManageVehicleBranch(
      Number(tenantId),
      vehicle.branch || null,
      actor,
    );
    await this.vehicleRepository.softDelete(vehicle.id);
    await this.auditTrailService.record({
      tenantId: Number(tenantId),
      branchId: vehicle.branch?.id,
      actor: {
        id: actor.id,
      },
      action: 'DELETE_VEHICLE',
      description: `vehicle ${this.getVehicleLabel(vehicle)} was deleted`,
      metadata: this.getVehicleAuditSnapshot(vehicle),
    });
  }

  private toVehiclePayload(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    catalog: ResolvedVehicleCatalog,
    isCreate = false,
  ): Partial<VehicleEntity> {
    const payload: Partial<VehicleEntity> = {
      make: vehicleDto.make?.trim() || catalog.brand.name,
      model: vehicleDto.model?.trim() || catalog.model.name,
      bodyType: vehicleDto.bodyType?.trim() || catalog.bodyType?.name || null,
    };

    if (vehicleDto.year !== undefined) payload.year = vehicleDto.year;
    if (vehicleDto.vin !== undefined) {
      payload.vin = vehicleDto.vin?.trim().toUpperCase() || null;
    }
    if (vehicleDto.plateNumber !== undefined) {
      payload.plateNumber =
        vehicleDto.plateNumber?.trim().toUpperCase() || null;
    }
    if (vehicleDto.mileage !== undefined) payload.mileage = vehicleDto.mileage;
    if (vehicleDto.condition !== undefined) {
      payload.condition = vehicleDto.condition;
    }
    if (vehicleDto.listingType !== undefined || isCreate) {
      payload.listingType = vehicleDto.listingType || VehicleListingType.Sale;
    }
    if (vehicleDto.status !== undefined || isCreate) {
      payload.status = vehicleDto.status || VehicleStatus.Available;
    }
    if (vehicleDto.price !== undefined) {
      payload.price =
        vehicleDto.price === null ? null : String(vehicleDto.price);
    }
    if (vehicleDto.location !== undefined)
      payload.location = vehicleDto.location;
    if (vehicleDto.exteriorColor !== undefined) {
      payload.exteriorColor = vehicleDto.exteriorColor;
    }
    if (vehicleDto.interiorColor !== undefined) {
      payload.interiorColor = vehicleDto.interiorColor;
    }
    if (vehicleDto.title !== undefined) payload.title = vehicleDto.title;
    if (vehicleDto.description !== undefined) {
      payload.description = vehicleDto.description;
    }
    if (vehicleDto.engineDetails !== undefined) {
      payload.engineDetails = vehicleDto.engineDetails;
    }
    if (vehicleDto.gearboxDetails !== undefined) {
      payload.gearboxDetails = vehicleDto.gearboxDetails;
    }
    if (vehicleDto.drivetrain !== undefined) {
      payload.drivetrain = vehicleDto.drivetrain;
    }
    if (vehicleDto.categorizedFeatures !== undefined) {
      payload.categorizedFeatures = vehicleDto.categorizedFeatures;
    }
    if (vehicleDto.flaws !== undefined) payload.flaws = vehicleDto.flaws;
    if (vehicleDto.listedOnBehalfOf !== undefined) {
      payload.listedOnBehalfOf = vehicleDto.listedOnBehalfOf;
    }
    if (vehicleDto.saleOptions !== undefined) {
      payload.saleOptions = vehicleDto.saleOptions;
    }
    if (vehicleDto.auctionOptions !== undefined) {
      payload.auctionOptions = vehicleDto.auctionOptions;
    }
    if (vehicleDto.rentalOptions !== undefined) {
      payload.rentalOptions = vehicleDto.rentalOptions;
    }
    if (vehicleDto.media !== undefined) payload.media = vehicleDto.media;
    if (vehicleDto.highlights !== undefined) {
      payload.highlights = vehicleDto.highlights;
    }
    if (vehicleDto.equipment !== undefined) {
      payload.equipment = vehicleDto.equipment;
    }
    if (vehicleDto.modifications !== undefined) {
      payload.modifications = vehicleDto.modifications;
    }
    if (vehicleDto.videoLinks !== undefined) {
      payload.videoLinks = vehicleDto.videoLinks;
    }
    if (vehicleDto.backwardCompatibility !== undefined) {
      payload.backwardCompatibility = vehicleDto.backwardCompatibility;
    }
    if (vehicleDto.isActive !== undefined)
      payload.isActive = vehicleDto.isActive;

    return payload;
  }

  private async resolveVehicleCatalog(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    existingVehicle?: VehicleEntity,
  ): Promise<ResolvedVehicleCatalog> {
    const brand = await this.resolveBrand(vehicleDto, existingVehicle);
    const bodyType = await this.resolveBodyType(vehicleDto, existingVehicle);
    const model = await this.resolveModel(
      vehicleDto,
      brand,
      bodyType,
      existingVehicle,
    );
    const generation = await this.resolveGeneration(
      vehicleDto,
      model,
      existingVehicle,
    );
    const trim = await this.resolveTrim(vehicleDto, model, existingVehicle);
    const engine = await this.resolveEngine(
      vehicleDto,
      brand,
      model,
      existingVehicle,
    );

    return {
      brand,
      model,
      generation,
      trim,
      engine,
      bodyType: bodyType || model.bodyType || null,
    };
  }

  private async resolveBrand(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    existingVehicle?: VehicleEntity,
  ): Promise<VehicleBrandEntity> {
    if (vehicleDto.brandId) {
      const brand = await this.vehicleBrandRepository.findOne({
        where: {
          id: vehicleDto.brandId,
        },
      });

      if (!brand) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            brandId: 'vehicleBrandNotFound',
          },
        });
      }

      return brand;
    }

    if (vehicleDto.make?.trim()) {
      return this.findOrCreateBrand(vehicleDto.make);
    }

    if (existingVehicle?.brand) {
      return existingVehicle.brand;
    }

    if (existingVehicle?.make?.trim()) {
      return this.findOrCreateBrand(existingVehicle.make);
    }

    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: {
        brandId: 'vehicleBrandRequired',
      },
    });
  }

  private async resolveBodyType(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    existingVehicle?: VehicleEntity,
  ): Promise<VehicleBodyTypeEntity | null> {
    if (vehicleDto.bodyTypeId) {
      const bodyType = await this.vehicleBodyTypeRepository.findOne({
        where: {
          id: vehicleDto.bodyTypeId,
        },
      });

      if (!bodyType) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            bodyTypeId: 'vehicleBodyTypeNotFound',
          },
        });
      }

      return bodyType;
    }

    if (vehicleDto.bodyType?.trim()) {
      return this.findOrCreateBodyType(vehicleDto.bodyType);
    }

    if (existingVehicle?.bodyTypeCatalog) {
      return existingVehicle.bodyTypeCatalog;
    }

    if (existingVehicle?.bodyType?.trim()) {
      return this.findOrCreateBodyType(existingVehicle.bodyType);
    }

    return null;
  }

  private async resolveModel(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    brand: VehicleBrandEntity,
    bodyType: VehicleBodyTypeEntity | null,
    existingVehicle?: VehicleEntity,
  ): Promise<VehicleModelEntity> {
    if (vehicleDto.modelId) {
      const model = await this.vehicleModelRepository.findOne({
        where: {
          id: vehicleDto.modelId,
        },
      });

      if (!model) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            modelId: 'vehicleModelNotFound',
          },
        });
      }

      if (Number(model.brand.id) !== Number(brand.id)) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            modelId: 'vehicleModelDoesNotBelongToBrand',
          },
        });
      }

      return model;
    }

    if (vehicleDto.model?.trim()) {
      return this.findOrCreateModel(vehicleDto.model, brand, bodyType);
    }

    if (existingVehicle?.modelCatalog) {
      return existingVehicle.modelCatalog;
    }

    if (existingVehicle?.model?.trim()) {
      return this.findOrCreateModel(existingVehicle.model, brand, bodyType);
    }

    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: {
        modelId: 'vehicleModelRequired',
      },
    });
  }

  private async resolveGeneration(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    model: VehicleModelEntity,
    existingVehicle?: VehicleEntity,
  ): Promise<VehicleGenerationEntity | null> {
    if (vehicleDto.generationId === undefined) {
      return existingVehicle?.generation || null;
    }

    if (!vehicleDto.generationId) {
      return null;
    }

    const generation = await this.vehicleGenerationRepository.findOne({
      where: {
        id: vehicleDto.generationId,
      },
    });

    if (!generation || Number(generation.model.id) !== Number(model.id)) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          generationId: 'vehicleGenerationNotFoundForModel',
        },
      });
    }

    return generation;
  }

  private async resolveTrim(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    model: VehicleModelEntity,
    existingVehicle?: VehicleEntity,
  ): Promise<VehicleTrimEntity | null> {
    if (vehicleDto.trimId === undefined) {
      return existingVehicle?.trim || null;
    }

    if (!vehicleDto.trimId) {
      return null;
    }

    const trim = await this.vehicleTrimRepository.findOne({
      where: {
        id: vehicleDto.trimId,
      },
    });

    if (!trim || Number(trim.model.id) !== Number(model.id)) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          trimId: 'vehicleTrimNotFoundForModel',
        },
      });
    }

    return trim;
  }

  private async resolveEngine(
    vehicleDto: CreateVehicleDto | UpdateVehicleDto,
    brand: VehicleBrandEntity,
    model: VehicleModelEntity,
    existingVehicle?: VehicleEntity,
  ): Promise<VehicleEngineEntity | null> {
    if (vehicleDto.engineId === undefined) {
      return existingVehicle?.engine || null;
    }

    if (!vehicleDto.engineId) {
      return null;
    }

    const engine = await this.vehicleEngineRepository.findOne({
      where: {
        id: vehicleDto.engineId,
      },
    });

    if (
      !engine ||
      Number(engine.brand.id) !== Number(brand.id) ||
      (engine.model && Number(engine.model.id) !== Number(model.id))
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          engineId: 'vehicleEngineNotFoundForBrandOrModel',
        },
      });
    }

    return engine;
  }

  private async findOrCreateBrand(name: string): Promise<VehicleBrandEntity> {
    const cleanName = name.trim();
    const slug = this.slugify(cleanName);
    const existingBrand = await this.vehicleBrandRepository.findOne({
      where: {
        slug,
      },
    });

    if (existingBrand) {
      return existingBrand;
    }

    return this.vehicleBrandRepository.save(
      this.vehicleBrandRepository.create({
        name: cleanName,
        slug,
      }),
    );
  }

  private async findOrCreateBodyType(
    name: string,
  ): Promise<VehicleBodyTypeEntity> {
    const cleanName = name.trim();
    const slug = this.slugify(cleanName);
    const existingBodyType = await this.vehicleBodyTypeRepository.findOne({
      where: {
        slug,
      },
    });

    if (existingBodyType) {
      return existingBodyType;
    }

    return this.vehicleBodyTypeRepository.save(
      this.vehicleBodyTypeRepository.create({
        name: cleanName,
        slug,
        code: cleanName.toUpperCase().replace(/[^A-Z0-9]+/g, '_'),
      }),
    );
  }

  private async findOrCreateModel(
    name: string,
    brand: VehicleBrandEntity,
    bodyType: VehicleBodyTypeEntity | null,
  ): Promise<VehicleModelEntity> {
    const cleanName = name.trim();
    const slug = this.slugify(cleanName);
    const existingModel = await this.vehicleModelRepository.findOne({
      where: {
        brand: {
          id: brand.id,
        },
        slug,
      },
    });

    if (existingModel) {
      return existingModel;
    }

    return this.vehicleModelRepository.save(
      this.vehicleModelRepository.create({
        name: cleanName,
        slug,
        brand,
        bodyType,
      }),
    );
  }

  private slugify(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async getTenantOrThrow(tenantId: Tenant['id']): Promise<Tenant> {
    const tenant = await this.tenantsService.findById(tenantId);

    if (!tenant) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'tenantNotFound',
      });
    }

    return tenant;
  }

  private async getVehicleOrThrow(
    tenantId: Tenant['id'],
    id: VehicleEntity['id'],
  ): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id: Number(id),
        tenant: {
          id: Number(tenantId),
        },
      },
    });

    if (!vehicle) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'vehicleNotFound',
      });
    }

    return vehicle;
  }

  private async resolveBranch(
    tenantId: number,
    branchId?: number | null,
  ): Promise<BranchEntity | null> {
    if (!branchId) {
      return null;
    }

    const branch = await this.branchRepository.findOne({
      where: {
        id: branchId,
        tenant: {
          id: tenantId,
        },
      },
    });

    if (!branch) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          branchId: 'branchNotFoundInTenant',
        },
      });
    }

    return branch;
  }

  private async resolveAssignedUser(
    tenantId: number,
    userId?: number | null,
  ): Promise<UserEntity | null> {
    if (!userId) {
      return null;
    }

    const membership = await this.tenantMembershipRepository.findOne({
      where: {
        tenant: {
          id: tenantId,
        },
        user: {
          id: userId,
        },
        status: TenantMembershipStatus.Active,
      },
    });

    if (!membership) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          assignedToId: 'userIsNotActiveTenantMember',
        },
      });
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return user || null;
  }

  private async ensureVinAndPlateAreAvailable(
    tenantId: number,
    vin?: string | null,
    plateNumber?: string | null,
    ignoreVehicleId?: number,
  ): Promise<void> {
    const normalizedVin = vin?.trim().toUpperCase();
    const normalizedPlateNumber = plateNumber?.trim().toUpperCase();

    if (normalizedVin) {
      const vehicle = await this.vehicleRepository.findOne({
        where: {
          tenant: {
            id: tenantId,
          },
          vin: normalizedVin,
        },
      });

      if (vehicle && Number(vehicle.id) !== Number(ignoreVehicleId)) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            vin: 'vinAlreadyExists',
          },
        });
      }
    }

    if (normalizedPlateNumber) {
      const vehicle = await this.vehicleRepository.findOne({
        where: {
          tenant: {
            id: tenantId,
          },
          plateNumber: normalizedPlateNumber,
        },
      });

      if (vehicle && Number(vehicle.id) !== Number(ignoreVehicleId)) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            plateNumber: 'plateNumberAlreadyExists',
          },
        });
      }
    }
  }

  private async ensureCanManageVehicleBranch(
    tenantId: number,
    branch: BranchEntity | null,
    actor: VehicleActor,
  ): Promise<void> {
    if (await this.canManageAllVehicleBranches(tenantId, actor)) {
      return;
    }

    if (branch && Number(branch.manager?.id) === Number(actor.id)) {
      return;
    }

    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      error: 'vehicleManageForbiddenForBranch',
    });
  }

  private async ensureCanManageAllVehicleBranches(
    tenantId: number,
    actor: VehicleActor,
  ): Promise<void> {
    if (await this.canManageAllVehicleBranches(tenantId, actor)) {
      return;
    }

    throw new ForbiddenException({
      status: HttpStatus.FORBIDDEN,
      error: 'vehicleManageAllForbidden',
    });
  }

  private async canManageAllVehicleBranches(
    tenantId: number,
    actor: VehicleActor,
  ): Promise<boolean> {
    if (Number(actor.role?.id) === RoleEnum.superAdmin) {
      return true;
    }

    const membership = await this.tenantMembershipRepository.findOne({
      where: {
        tenant: {
          id: tenantId,
        },
        user: {
          id: Number(actor.id),
        },
        status: TenantMembershipStatus.Active,
      },
    });

    if (!membership?.role?.id) {
      return false;
    }

    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        role: {
          id: membership.role.id,
        },
      },
    });
    const permissionKeys = rolePermissions.map(
      (rolePermission) => rolePermission.permission.key,
    );

    return (
      permissionKeys.includes('branches.manage-all') ||
      permissionKeys.includes('workspace.manage')
    );
  }

  private getVehicleChangeDescriptions(
    previous: VehicleEntity,
    next: VehicleEntity,
  ): string[] {
    return [
      previous.make !== next.make
        ? `make changed from ${previous.make} to ${next.make}`
        : null,
      previous.model !== next.model
        ? `model changed from ${previous.model} to ${next.model}`
        : null,
      previous.status !== next.status
        ? `status changed from ${previous.status} to ${next.status}`
        : null,
      previous.listingType !== next.listingType
        ? `listing type changed from ${previous.listingType} to ${next.listingType}`
        : null,
      previous.price !== next.price
        ? `price changed from ${previous.price || 'None'} to ${next.price || 'None'}`
        : null,
      Number(previous.branch?.id || 0) !== Number(next.branch?.id || 0)
        ? `branch changed from ${previous.branch?.code || 'None'} to ${next.branch?.code || 'None'}`
        : null,
      Number(previous.assignedTo?.id || 0) !== Number(next.assignedTo?.id || 0)
        ? `assigned user changed from ${previous.assignedTo?.email || 'None'} to ${next.assignedTo?.email || 'None'}`
        : null,
      previous.isActive !== next.isActive
        ? `active status changed from ${previous.isActive} to ${next.isActive}`
        : null,
    ].filter(Boolean) as string[];
  }

  private getVehicleAuditSnapshot(
    vehicle: VehicleEntity,
  ): Record<string, unknown> {
    return {
      vehicleId: vehicle.id,
      brandId: vehicle.brand?.id,
      brandName: vehicle.brand?.name,
      modelId: vehicle.modelCatalog?.id,
      modelName: vehicle.modelCatalog?.name,
      generationId: vehicle.generation?.id,
      generationName: vehicle.generation?.name,
      trimId: vehicle.trim?.id,
      trimName: vehicle.trim?.name,
      engineId: vehicle.engine?.id,
      engineName: vehicle.engine?.name,
      bodyTypeId: vehicle.bodyTypeCatalog?.id,
      bodyTypeName: vehicle.bodyTypeCatalog?.name,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      vin: vehicle.vin,
      plateNumber: vehicle.plateNumber,
      branchId: vehicle.branch?.id,
      branchCode: vehicle.branch?.code,
      assignedToId: vehicle.assignedTo?.id,
      assignedToEmail: vehicle.assignedTo?.email,
      listingType: vehicle.listingType,
      status: vehicle.status,
      price: vehicle.price,
      isActive: vehicle.isActive,
    };
  }

  private getVehicleLabel(vehicle: VehicleEntity): string {
    return [vehicle.year, vehicle.make, vehicle.model]
      .filter(Boolean)
      .join(' ');
  }
}
