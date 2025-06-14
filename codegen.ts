import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["./src/graphql/operations/**/*.graphql"],

  // 👇 keep the existing client output
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: { withHooks: true, enumsAsTypes: true },
    },

    // 🔥 NEW – resolver typings
    "./src/generated/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
      config: {
        scalars: {
          ID: "number",         
        },
      }
    },
  },
  ignoreNoDocuments: true,
};
export default config;
