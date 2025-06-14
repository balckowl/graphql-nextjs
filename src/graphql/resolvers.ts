import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { Resolvers } from "@/generated/resolver-types";


export const resolvers: Resolvers = {
  Query: {
    getPosts: async () => {
      const q = await db.select().from(postsTable);
      return q;
    },
  },
  Mutation: {
    addPost: async (_, { input }) => {
      const [post] = await db
        .insert(postsTable)
        .values({
          title: input.title,
          content: input.content,
        })
        .returning();
      return post;
    },
  }
};
