import { container } from "tsyringe";

import DiskStorageProvider from "./implementations/DiskStorageProvider";
import IStorageProvider from "./models/IStorageProvider";
import MIStorageProvider from "./implementations/MIStorageProvider"

const providers =  {
  disk: DiskStorageProvider,
  ms: MIStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.ms
);
