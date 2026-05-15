import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
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
import { SettingResponseDto } from './dto/setting-response.dto';
import { UpsertSettingDto } from './dto/upsert-setting.dto';
import { SettingsService } from './settings.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@ApiTags('Platform settings')
@Controller({
  path: 'settings',
  version: '1',
})
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOkResponse({ type: SettingResponseDto })
  @ApiOperation({
    summary: 'Get a named JSON settings blob',
    description:
      'Example names: `ai_config`. Restricted to platform administrators.',
  })
  @ApiParam({ name: 'name', example: 'ai_config' })
  @RequirePermissions('platform.manage')
  @Get(':name')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('name') name: string): Promise<SettingResponseDto> {
    const row = await this.settingsService.findByName(name);
    if (!row) {
      throw new NotFoundException(`Setting "${name}" not found`);
    }
    return {
      name: row.name,
      value: row.value,
      updatedAt: row.updatedAt,
    };
  }

  @ApiOkResponse({ type: SettingResponseDto })
  @ApiOperation({
    summary: 'Create or replace a named JSON settings blob',
  })
  @ApiParam({ name: 'name', example: 'ai_config' })
  @RequirePermissions('platform.manage')
  @Put(':name')
  @HttpCode(HttpStatus.OK)
  async upsert(
    @Param('name') name: string,
    @Body() dto: UpsertSettingDto,
  ): Promise<SettingResponseDto> {
    const row = await this.settingsService.upsertValue(name, dto.value);
    return {
      name: row.name,
      value: row.value,
      updatedAt: row.updatedAt,
    };
  }
}
