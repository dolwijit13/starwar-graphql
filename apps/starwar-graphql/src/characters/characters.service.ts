import configuration from '@/config/configuration';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Character } from './character.entity';

@Injectable()
export class CharactersService {
  async findAll(): Promise<Character[]> {
    const characters = await axios({
      url: configuration().starwarApi,
      method: 'post',
      data: {
        query: `query {
          allPeople {
            people {
              id
              name
              filmConnection {
                films {
                  id
                  title
                }
              }
            }
          }
        }
        `,
      },
    });
    console.log(characters.data.data.allPeople.people);
    return characters.data.data.allPeople.people as Character[];
  }

  async findByID(id: string): Promise<Character> {
    const character = await axios({
      url: configuration().starwarApi,
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
