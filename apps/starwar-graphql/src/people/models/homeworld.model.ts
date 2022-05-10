import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Homeworld {
  @Field(type => String)
  name: string;

  @Field(type => Int, { nullable: true })
  diameter?: number;
}
