import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class InviteTenantMemberDto {
  @ApiProperty({ example: 'new.member@example.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Jane' })
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty({ example: 'Staff' })
  @IsString()
  @MinLength(1)
  lastName: string;

  @ApiProperty({ example: 12 })
  @IsInt()
  @Type(() => Number)
  roleId: number;

  @ApiPropertyOptional({ example: 'Sales Consultant' })
  @IsOptional()
  @IsString()
  title?: string | null;

  @ApiPropertyOptional({
    example: 1,
    description:
      'Optional branch to assign as manager context for this invited user.',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  branchId?: number | null;
}
