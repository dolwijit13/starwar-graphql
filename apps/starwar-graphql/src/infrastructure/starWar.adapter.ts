import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StarWarAdapter {
  async getAllPeople() {
    const result = await axios({
      url: process.env.SWAPI_API,
      method: 'post',
      data: {
        query: `
          query {
            allPeople{
              people {
                id,
                name,
                species {
                  name,
                  homeworld {
                    name,
                    diameter
                  }
                },
                height,
                gender
              }
            }
          }
          `
      }
    })

    return result.data.data.allPeople.people
  }
}
