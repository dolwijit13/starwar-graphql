import { Sequelize } from 'sequelize-typescript';
import { Company } from '../company/company.entity';
import { User } from '../user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        host: ':memory:',
      });
      sequelize.addModels([User, Company]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
