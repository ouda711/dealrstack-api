import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsString, MaxLength, Min } from 'class-validator';
import { VehicleAttachmentUploadKind } from './vehicle-attachment-upload-kind.enum';

export class VehicleAttachmentPresignDto {
  @ApiProperty({ example: 'front-angle.jpg' })
  @IsString()
  @MaxLength(255)
  fileName: string;

  @ApiProperty({ example: 1024000 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  fileSize: number;

  @ApiProperty({ enum: VehicleAttachmentUploadKind })
  @IsEnum(VehicleAttachmentUploadKind)
  kind: VehicleAttachmentUploadKind;
}
