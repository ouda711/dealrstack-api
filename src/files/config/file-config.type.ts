export enum FileDriver {
  LOCAL = 'local',
  S3 = 's3',
  S3_PRESIGNED = 's3-presigned',
}

export type FileConfig = {
  driver: FileDriver;
  accessKeyId?: string;
  secretAccessKey?: string;
  awsDefaultS3Bucket?: string;
  awsS3Region?: string;
  /** Optional public base URL for uploaded objects (e.g. CloudFront). No trailing slash. */
  publicAssetBaseUrl?: string;
  maxFileSize: number;
};
