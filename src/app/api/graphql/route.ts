import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers";
import { constraintDirectiveTypeDefs, constraintDirective } from "graphql-constraint-directive";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { db } from "@/db";

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
})

schema = constraintDirective()(schema);

const server = new ApolloServer({
  schema,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async req => ({ req, db }),
})

export { handler as GET, handler as POST };
