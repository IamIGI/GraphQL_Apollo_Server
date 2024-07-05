export interface Game {
  id: string;
  title: string;
  platform: string[];
  reviews?: Review[];
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
  reviews?: Review[];
}

export const typeDefs = `#graphql
type Game {
    id: ID!,
    title: String!,
    platform: [String!]!
    reviews: [Review!]
   
}
type Review {
    id: ID!,
    rating: Int!
    content: String!
    game: Game!
    author: Author!
    game_id: String!
    author_id: String!
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
}

type Mutation {
    addGame(game: AddGameInput!): Game
    updateGame(id: ID!, edits: EditGameInput): Game
    deleteGame(id: ID!): [Game]
}

input AddGameInput {
    title: String!
    platform: [String!]!
}
input EditGameInput {
    title: String
    platform: [String!]
}

`;
