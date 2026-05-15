import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PublicVehicleListingDto } from './dto/vehicle-marketing-response.dto';
import { VehicleMarketingService } from './vehicle-marketing.service';

@ApiTags('Public Listings')
@Controller({
  path: 'public/listings',
  version: '1',
})
export class PublicListingsController {
  constructor(
    private readonly vehicleMarketingService: VehicleMarketingService,
  ) {}

  @ApiOkResponse({ type: PublicVehicleListingDto })
  @ApiOperation({
    summary: 'View a public vehicle listing',
    description:
      'Records a listing view with optional ref query param (whatsapp, facebook, etc.).',
  })
  @ApiParam({ name: 'tenantSlug', type: String, required: true })
  @ApiParam({ name: 'listingSlug', type: String, required: true })
  @ApiQuery({ name: 'ref', required: false, type: String })
  @Get(':tenantSlug/:listingSlug')
  @HttpCode(HttpStatus.OK)
  getPublicListing(
    @Param('tenantSlug') tenantSlug: string,
    @Param('listingSlug') listingSlug: string,
    @Query('ref') ref?: string,
  ): Promise<PublicVehicleListingDto> {
    return this.vehicleMarketingService.getPublicListing(
      tenantSlug,
      listingSlug,
      ref,
    );
  }

  @ApiOperation({
    summary: 'Record a share-link click (optional telemetry)',
  })
  @ApiParam({ name: 'tenantSlug', type: String, required: true })
  @ApiParam({ name: 'listingSlug', type: String, required: true })
  @ApiQuery({ name: 'channel', required: true, type: String })
  @Post(':tenantSlug/:listingSlug/click')
  @HttpCode(HttpStatus.NO_CONTENT)
  recordClick(
    @Param('tenantSlug') tenantSlug: string,
    @Param('listingSlug') listingSlug: string,
    @Query('channel') channel: string,
  ): Promise<void> {
    return this.vehicleMarketingService.recordShareLinkClick(
      tenantSlug,
      listingSlug,
      channel,
    );
  }
}
