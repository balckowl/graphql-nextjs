import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "@/graphql/resolvers";
import { constraintDirectiveTypeDefs, constraintDirective } from "graphql-constraint-directive";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { db } from "@/db";
import { NextRequest } from "next/server";
import { Resolvers } from "@/generated/resolver-types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
})

schema = constraintDirective()(schema);

const server = new ApolloServer<Resolvers>({
  schema,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => {

    const session = await auth.api.getSession({
      headers: await headers()
    })

    return { db, session }
  }
})

export { handler as GET, handler as POST };
