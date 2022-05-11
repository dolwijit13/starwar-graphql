import { Field, ObjectType } from '@nestjs/graphql';
import { Species } from './species.model';

@ObjectType()
export class Person {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Species, { nullable: true })
  species?: Species;
}
