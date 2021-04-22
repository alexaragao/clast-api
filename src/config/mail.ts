interface IMailConfig {
  driver: 'ethereal' | 'outlook';

  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig
