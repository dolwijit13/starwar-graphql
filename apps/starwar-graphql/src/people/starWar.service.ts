import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StarWarService {
  async getAllPeople() {
    const result = await axios({
      url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      method: 'post',
      data: {
        query: `
            query {
              allPeople {
                totalCount
                people {
                  species {
                    name
                  }
                  name
                  birthYear
                  gender
                  id
                }
              }
            }
          `
      }
    })

    return result.data.data.allPeople.people
  }
}
