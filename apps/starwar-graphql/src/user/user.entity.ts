import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@ObjectType()
@Table
export class User extends Model<User> {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
  id: number;

  @Field()
  @Column
  firstName: string;

  @Field()
  @Column
  lastName: string;
}
