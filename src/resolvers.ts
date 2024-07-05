import db from './_db';

interface ReviewArgs {
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
    review(parent: undefined, args: ReviewArgs) {
      return db.reviews.find((a) => a.id == args.id);
    },
    author(parent: undefined, args: ReviewArgs) {
      return db.authors.find((a) => a.id == args.id);
    },
    game(parent: undefined, args: ReviewArgs) {
      return db.games.find((a) => a.id == args.id);
    },
  },
};
