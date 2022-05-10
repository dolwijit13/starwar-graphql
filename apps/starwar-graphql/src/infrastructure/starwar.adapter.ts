import axios from 'axios';
import { Injectable } from '@nestjs/common';
import configuration from '@/config/configuration';
import { Character } from '@/src/characters/character.entity';

@Injectable()
export class StarwarAdapter {
  async getAllCharacters(): Promise<Character[]> {
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
    return characters.data.data.allPeople.people as Character[];
  }

  async getCharacterByID(id: string): Promise<Character> {
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
