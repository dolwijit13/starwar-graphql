import { Field, ObjectType } from '@nestjs/graphql';
import { Homeworld } from './homeworld.model';

@ObjectType()
export class Species {
  @Field(type => String)
  name: string;

  @Field(type => Homeworld, { nullable: true })
  homeworld?: Homeworld;
}
