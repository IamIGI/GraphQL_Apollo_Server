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


*/
