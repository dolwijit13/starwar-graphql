import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
@ObjectType()
export class User extends Model<User> {
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
}
