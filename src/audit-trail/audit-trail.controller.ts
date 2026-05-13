import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequirePermissions } from '../access/permissions.decorator';
import { PermissionsGuard } from '../access/permissions.guard';
import { AuditTrailService } from './audit-trail.service';
import { QueryAuditTrailDto } from './dto/query-audit-trail.dto';
import { AuditTrailEntity } from './infrastructure/persistence/relational/entities/audit-trail.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Audit Trail')
@Controller({
  path: 'tenants/:tenantId/audit-trail',
  version: '1',
})
export class AuditTrailController {
  constructor(private readonly auditTrailService: AuditTrailService) {}

  @ApiOkResponse({
    type: AuditTrailEntity,
    isArray: true,
  })
  @ApiOperation({
    summary: 'List tenant audit trail events',
    description:
      'Returns major workspace activities. Tenant admins see the tenant audit trail; branch-scoped users only see events tied to their assigned branches.',
  })
  @Get()
  @RequirePermissions('audit.view')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'tenantId',
    type: Number,
    required: true,
  })
  findByTenant(
    @Param('tenantId') tenantId: string,
    @Query() query: QueryAuditTrailDto,
    @Request() request,
  ) {
    return this.auditTrailService.findByTenant(
      Number(tenantId),
      request.user,
      query,
    );
  }
}
