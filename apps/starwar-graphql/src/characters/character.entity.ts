import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Film {
  @Field()
  id: string;

  @Field()
  title: string;
}

@ObjectType()
class FilmConnection {
  @Field((type) => [Film])
  films: Film[];
}

@ObjectType()
export class Character {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field((type) => FilmConnection, { nullable: true })
  filmConnection?: FilmConnection;
}
