interface IMailConfig {
  driver: 'ses' | 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@vmssistemas.com.br',
      name: 'VMS Sistemas Soluções Inteligentes',
    },
  },
} as IMailConfig;
