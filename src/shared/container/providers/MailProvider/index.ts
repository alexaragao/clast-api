import { container } from "tsyringe";
import EtherealMailProvider from "./implementations/EtherealMailProvider";
import OutlookMailProvider from "./implementations/OutlookMailProvider";
import IMailProvider from "./models/IMailProvider";
import mailConfig from '../../../../config/mail';

const providers =  {
  ethereal: container.resolve(EtherealMailProvider),
  outlook: container.resolve(OutlookMailProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
