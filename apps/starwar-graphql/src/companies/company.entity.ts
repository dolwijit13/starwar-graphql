import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { User } from '@/src/users/user.entity';

@Table
@ObjectType()
export class Company extends Model<Company> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  @Field((type) => Int)
  id: number;

  @Column({
    type: DataType.STRING,
  })
  @Field()
  name: string;

  @HasMany(() => User)
  @Field((type) => [User], { nullable: true })
  users?: User[];
}
