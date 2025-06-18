import { postsTable } from "@/db/schema";
import { Resolvers } from "@/generated/resolver-types";


export const resolvers: Resolvers = {
  Query: {
    getPosts: async (_, {}, ctx) => {
      const q = await ctx.db.select().from(postsTable);
      return q;
    },
  },
  Mutation: {
    addPost: async (_, { input }, ctx) => {

      if(!ctx.session?.user.id) throw Error("UnAuthorization")

      const [post] = await ctx.db
        .insert(postsTable)
        .values({
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id
        })
        .returning();
      return post;
    },
  }
};
