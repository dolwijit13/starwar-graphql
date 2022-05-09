import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field()
  id: string;

  @Field()
  name: string;
}
