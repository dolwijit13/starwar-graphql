import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from '@/src/users/user.entity';
import { Provider } from '@nestjs/common';

export function createDatabaseProvider(option: SequelizeOptions): Provider {
  return {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(option);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  };
}
