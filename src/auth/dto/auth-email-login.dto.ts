import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'tenant-admin@dealrstack.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: false,
    type: Number,
    example: 1,
    description:
      'Optional tenant to use as the current workspace context. If omitted and the user belongs to multiple tenants, currentTenant is null.',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  tenantId?: number;
}
