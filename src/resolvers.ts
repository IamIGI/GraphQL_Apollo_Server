import db from './_db';
import { Author, Game, Review } from './schema';

interface FindById {
  id: string;
}

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(parent: undefined, args: FindById) {
      return db.reviews.find((a) => a.id == args.id);
    },
    author(parent: undefined, args: FindById) {
      return db.authors.find((a) => a.id == args.id);
    },
    game(parent: undefined, args: FindById) {
      return db.games.find((a) => a.id == args.id);
    },
  },
  //Allow to return reviews data in game request, so we send request for game, and inside that we ask for reviews object
  /*
  query GameQuery($id: ID!) {
  game(id: $id) {
    title,
    reviews {
       rating,
       content
    }
  }
}
  */
  Game: {
    reviews(parent: Game) {
      return db.reviews.filter((a) => a.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent: Author) {
      return db.reviews.filter((a) => a.author_id === parent.id);
    },
  },
  Review: {
    author(parent: Review) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent: Review) {
      return db.games.find((a) => a.id === parent.game_id);
    },
  },
};
