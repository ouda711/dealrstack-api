import { ApiProperty } from '@nestjs/swagger';

export class VehicleAttachmentUploadResponseDto {
  @ApiProperty({
    description:
      'Public URL to use when creating vehicle media or document records after upload completes.',
  })
  fileUrl: string;

  @ApiProperty({
    description:
      'Object key (S3) or stored filename (local). Useful for support and deduplication.',
  })
  objectKey: string;
}

export class VehicleAttachmentPresignResponseDto extends VehicleAttachmentUploadResponseDto {
  @ApiProperty({
    description: 'HTTP PUT URL the client uses to upload the file bytes.',
  })
  uploadUrl: string;
}
