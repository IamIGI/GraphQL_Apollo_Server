import db from './_db';
import { Author, Game, Review } from './schema';

interface FindById {
  id: string;
}

interface AddGame {
  title: string;
  platform: string[];
}

interface EditGame extends Partial<AddGame> {}

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
  Mutation: {
    addGame(parent: undefined, args: { game: AddGame }) {
      let game = { ...args.game, id: crypto.randomUUID() };
      db.games.push(game);

      return game;
    },
    updateGame(parent: undefined, args: { id: String; edits: EditGame }) {
      const { id, edits } = args;
      db.games = db.games.map((game) => {
        if (game.id === id) {
          return {
            ...game,
            ...edits,
          };
        }
        return game;
      });

      return db.games.find((a) => a.id === id);
    },
    deleteGame(parent: undefined, args: FindById) {
      db.games = db.games.filter((a) => a.id !== args.id);

      return db.games;
    },
  },
};
