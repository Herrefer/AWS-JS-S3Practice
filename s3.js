import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {AWS_BUCKET_REGION, AWS_PUBLIC_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME} from './helpers/config.js'
import fs from 'fs'

export const client = new S3Client ({
    region : AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
})
