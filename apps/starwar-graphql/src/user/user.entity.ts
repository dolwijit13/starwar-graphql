import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Company } from '../company/company.entity';

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

  @Field(() => Int)
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  companyID?: number;

  @Field(() => Int)
  @BelongsTo(() => Company)
  company?: Company;
}
