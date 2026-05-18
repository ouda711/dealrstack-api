import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicWebsiteLeadDto } from './dto/public-website-lead.dto';
import { SalesLeadCaptureService } from './sales-lead-capture.service';

@ApiTags('Public lead capture')
@ApiExcludeController()
@Controller({
  path: 'public/tenants/:tenantSlug/leads',
  version: '1',
})
export class PublicWebsiteLeadController {
  constructor(private readonly leadCaptureService: SalesLeadCaptureService) {}

  @ApiOperation({
    summary: 'Submit a website lead (requires X-Lead-Capture-Token)',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createLead(
    @Param('tenantSlug') tenantSlug: string,
    @Headers('x-lead-capture-token') token: string | undefined,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Body() dto: PublicWebsiteLeadDto,
  ) {
    return this.leadCaptureService.createWebsiteLead(
      tenantSlug,
      token,
      dto,
      idempotencyKey,
    );
  }
}
