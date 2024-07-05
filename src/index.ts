import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log('Server listen on: ', 4000);
}

startServer();

//--------Example client queries:
//---Sandbox: https://studio.apollographql.com/sandbox/explorer -------
/*

query GamesQuery {
  games {
    title,
    platform
  }
  authors {
    name, verified
  }
}

-------
query ReviewsQuery($id: ID!) {
review(id: $id) {
  rating, content
}
}

query GameQuery($id: ID!) {
game(id: $id) {
  platform
}
}

query ReviewQuery($id: ID!) {
  review(id: $id) {
    rating
    game {
      title, platform
      reviews {
         rating
      }
    }
    }
  }
}

mutation AddMutation($game: AddGameInput!) {
  addGame(game: $game) {
    id,
    title,
     platform
  }
}

mutation UpdateMutation( $id: ID!, $edits: EditGameInput!) {
  updateGame(id: $id, edits: $edits) {
    id,
    title,
    platform
  }
}

mutation DeleteMutation($id: ID!){
  deleteGame(id: $id) {
    id, title, platform
  }
}


*/
