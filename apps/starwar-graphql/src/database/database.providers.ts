import { Sequelize } from 'sequelize-typescript';
import { User } from '@/src/users/user.entity';
import configuration from '@/config/configuration';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        database: configuration().db,
        host: configuration().dbHost,
        port: +configuration().dbPort,
        username: configuration().dbUsername,
        password: configuration().dbPassword,
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
