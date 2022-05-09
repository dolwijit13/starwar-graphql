import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Character } from './character.entity';

@Injectable()
export class CharactersService {
  async findAll(): Promise<Character[]> {
    const characters = await axios({
      url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      method: 'post',
      data: {
        query: `query {
          allPeople {
            people {
              id
              name
            }
          }
        }
        `,
      },
    });
    return characters.data.data.allPeople.people as Character[];
  }

  async findByID(id: string): Promise<Character> {
    const character = await axios({
      url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      method: 'post',
      data: {
        query: `query {
          person(id: "${id}") {
              id
              name
          }
        }
        `,
      },
    });
    return character.data.data.person as Character;
  }
}
