import { Field, ObjectType } from '@nestjs/graphql';
import { Homeworld } from './homeworld.model';

@ObjectType()
export class Species {
  @Field()
  name: string;

  @Field(() => Homeworld, { nullable: true })
  homeworld?: Homeworld;
}
