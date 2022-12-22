import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime
  scalar JSON

  type Query {
    hello: String!
    submissions: [Submission!]!
  }

  type Submission {
    id: ID!
    submittedAt: DateTime!
    data: JSON!
  }
`;
