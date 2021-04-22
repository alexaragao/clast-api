import IMailProvider from "../models/IMailProvider";
import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import mailConfig from '../../../../../config/mail';

@injectable()
export default class OutlookMailProvider implements IMailProvider {
  private client: Transporter;

   constructor(
     @inject('MailTemplateProvider')
     private mailTemplateProvider: IMailTemplateProvider
   ) {}

  public async sendMail({ to, from, subject, templateData }:ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from : {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })
  }
}
