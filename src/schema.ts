export interface Game {
  id: string;
  title: string;
  platform: string[];
}

export interface Review {
  id: string;
  rating: number;
  content: string;
  author_id: string;
  game_id: string;
}
export interface Author {
  id: string;
  name: string;
  verified: boolean;
}

export const typeDefs = `#graphql
type Game {
    id: ID!,
    title: String!,
    platform: [String!]!
}
type Review {
    id: ID!,
    rating: Int!
    content: String!
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!
}

type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
}

`;
