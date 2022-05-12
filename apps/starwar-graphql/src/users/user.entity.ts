import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Company } from '@/src/companies/company.entity';

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

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @Field((type) => Int)
  companyID: number;

  @BelongsTo(() => Company)
  @Field(() => Company)
  company: Company;
}
