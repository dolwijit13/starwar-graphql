import { Field, ObjectType } from '@nestjs/graphql';
import { Species } from './species.model';

@ObjectType()
export class Person {
  @Field(type => String)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => Species, { nullable: true })
  species?: Species;
}
