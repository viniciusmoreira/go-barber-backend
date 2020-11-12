import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req, file, cb) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname.replace(' ', '_')}`;

        return cb(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-vm',
    },
  },
} as IUploadConfig;
