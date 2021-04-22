import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

// const azureStorage: MulterAzureStorage = new MulterAzureStorage({
//   connectionString: `DefaultEndpointsProtocol=https;AccountName=${process.env.ACCOUNT_NAME};AccountKey=${process.env.ACCOUNT_KEY};EndpointSuffix=core.windows.net`,
//   accessKey: process.env.ACCOUNT_KEY,
//   accountName: process.env.ACCOUNT_NAME,
//   containerName: process.env.CONTAINER_NAME,
//   containerAccessLevel: process.env.CONTAINER_ACCESS_LEVEL as ContainerAccessLevel,
//   urlExpirationTime: Number(process.env.URL_EXPIRATION_TIME)
// })

export default {
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  }),
}
