import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';

import { db } from '../utils';

export const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,

  Query: {
    hello: () => 'Hello Zoms!',
    submissions: async () => {
      console.log('submissions');
      const submissions = await db.submission.findMany();
      return submissions;
    },
  },
};
