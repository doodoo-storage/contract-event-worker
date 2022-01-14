import { S3 } from 'aws-sdk';
import env from 'env-var';

const RESOURCE_STORE_BUCKET = env.get('RESOURCE_STORE_BUCKET').required().asString();

export const getS3Object = (key: string): Promise<S3.Body> =>
  new Promise((resolve, reject) => {
    new S3({ region: 'ap-northeast-2' })
    .getObject(
      { Bucket: RESOURCE_STORE_BUCKET, Key: key },
      (err, data) => {
        if (err) return reject(err);
        return resolve(data.Body);
      }
    )  
  });

