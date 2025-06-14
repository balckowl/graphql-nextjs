import { readFileSync } from "fs";
import { join } from "path";

export const typeDefs = readFileSync(join(process.cwd(), "src","graphql","schema.graphql"), "utf-8");


