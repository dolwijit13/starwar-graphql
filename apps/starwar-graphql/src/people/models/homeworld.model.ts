import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Homeworld {
  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  diameter?: number;
}
