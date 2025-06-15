import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { Resolvers } from "@/generated/resolver-types";
import type { Db } from "@/db";


export const resolvers: Resolvers = {
  Query: {
    getPosts: async (_, {}, ctx: { db: Db }) => {
      const q = await ctx.db.select().from(postsTable);
      return q;
    },
  },
  Mutation: {
    addPost: async (_, { input }, ctx: { db: Db }) => {
      const [post] = await ctx.db
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
