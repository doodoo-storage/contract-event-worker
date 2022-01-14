import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import env from 'env-var';
import { readFile } from 'fs';
import { v4 } from 'uuid';

// @ts-ignore
import { create } from 'ipfs-http-client';

const IPFS_API_URL = env.get('IPFS_API_URL').required().asString();

export const uploadToDisk = (key: string): RequestHandler => {
  const diskStorage = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../upload'));
      },
      filename: (req, file, cb) => {
        cb(null, `${v4()}${path.extname(file.originalname)}`);
      }
    })
  });

  const upload = diskStorage.single(key);
  return (req, res, next) => {
    upload(req, res, (err: any) => {
      if (err) throw new Error('failed multer upload');
      return next();
    });
  }
}

export const uploadToIPFS = async (filename: string) => {
  const ipfs = create({ host: IPFS_API_URL, port: 80, protocol: 'http' });
  const file = await getFile(filename);
  return await ipfs.add({ content: file });
}

const getFile = (filename: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    readFile(path.resolve(__dirname, `../../upload/${filename}`), (err, data) => {
      if (err) return reject('failed read file');
      return resolve(data);
    })
  });