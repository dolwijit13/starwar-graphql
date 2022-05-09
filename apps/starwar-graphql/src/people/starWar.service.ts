import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StarWarService {
  async getAllPeople(query: string[]) {
    const result = await axios({
      url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      method: 'post',
      data: {
        query: `
          query {
            allPeople{
              people {
                ${query}
              }
            }
          }
          `
      }
    })

    return result.data.data.allPeople.people
  }
}
