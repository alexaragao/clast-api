import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../../../config/upload';
import IStorageProvider from "../models/IStorageProvider";
import { ca, fil } from 'date-fns/locale';
import * as azure from 'azure-storage';

class MIStorageProvider implements IStorageProvider {
  constructor() {
    // this.client = new
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    try {
      const blobSvc = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=clast;AccountKey=XmvUoSQd64edwFOAkMOrhShpuQey/QE60aXbXoqdxUn4OLeCNz+sSPEf//U2B+qJ6gzbnimuSXoz8jLLDofr8g==;EndpointSuffix=core.windows.net');

      var options = {
        contentType: 'image/jpeg',
        metadata: { fileName: file }
      };

      await blobSvc.createBlockBlobFromLocalFile(process.env.CONTAINER_NAME, file, originalPath, options,
        function (error, result, response) {
        if (error) {
          file = 'default.png'
        }
      });
    }
    catch(ex) {
      console.log(ex);
    }

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default MIStorageProvider;
