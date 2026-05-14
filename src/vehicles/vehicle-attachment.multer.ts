import {
  HttpStatus,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { diskStorage } from 'multer';
import type { Request } from 'express';
import { VehicleAttachmentUploadKind } from './dto/vehicle-attachment-upload-kind.enum';

const galleryNamePattern = /\.(jpg|jpeg|png|gif|webp)$/i;
const documentNamePattern = /\.(pdf)$/i;

export function assertVehicleAttachmentFileNameAllowed(
  kind: VehicleAttachmentUploadKind,
  fileName: string,
): void {
  if (kind === VehicleAttachmentUploadKind.Gallery) {
    if (!fileName.match(galleryNamePattern)) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: `cantUploadFileType`,
        },
      });
    }
    return;
  }
  if (!fileName.match(documentNamePattern)) {
    throw new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: {
        file: `cantUploadFileType`,
      },
    });
  }
}

function parseKindFromRequest(
  req: Request,
): VehicleAttachmentUploadKind | null {
  const raw = req.query?.['kind'];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === VehicleAttachmentUploadKind.Gallery) {
    return VehicleAttachmentUploadKind.Gallery;
  }
  if (value === VehicleAttachmentUploadKind.Document) {
    return VehicleAttachmentUploadKind.Document;
  }
  return null;
}

export function createVehicleAttachmentMulterOptions(maxFileSize: number) {
  return {
    limits: {
      fileSize: maxFileSize,
    },
    storage: diskStorage({
      destination: './files',
      filename: (_req, file, callback) => {
        callback(
          null,
          `${randomStringGenerator()}.${file.originalname
            .split('.')
            .pop()
            ?.toLowerCase()}`,
        );
      },
    }),
    fileFilter: (req: Request, file: Express.Multer.File, callback) => {
      const kind = parseKindFromRequest(req);
      if (!kind) {
        return callback(
          new BadRequestException({
            status: HttpStatus.BAD_REQUEST,
            errors: {
              kind: 'invalidKind',
            },
          }),
          false,
        );
      }
      try {
        assertVehicleAttachmentFileNameAllowed(kind, file.originalname);
      } catch (err) {
        return callback(err as Error, false);
      }
      callback(null, true);
    },
  };
}
