import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: ["./src/graphql/operations/**/*.graphql"],

  // 👇 keep the existing client output
  generates: {
    "./src/generated/graphql.tsx": {
      schema: "http://localhost:3000/api/graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        enumsAsTypes: true,
        strictScalars: true,
        scalars: {
          ID: "number",
          content_String_NotNull_minLength_1_maxLength_3: "string",
          title_String_NotNull_minLength_1_maxLength_3: "string"
        },
      }
    },

    // 🔥 NEW – resolver typings
    "./src/generated/resolver-types.ts": {
      schema: "http://localhost:3000/api/graphql",
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
      config: {
        scalars: {
          ID: "number",
          content_String_NotNull_minLength_1_maxLength_3: "string",
          title_String_NotNull_minLength_1_maxLength_3: "string"
        },
        strictScalars: true,
      }
    },

    "./src/generated/validation.ts": {
      schema: "./src/graphql/schema.graphql",
      plugins: ["typescript", "typescript-validation-schema"],
      config: {
        schema: "zod",
        scalars: {
          ID: "number",
          content_String_NotNull_minLength_1_maxLength_3: "string",
          title_String_NotNull_minLength_1_maxLength_3: "string",
        },
        directives: {
          required: {
            msg: "required"
          },
          constraint: {
            minLength: ["min", "$1", "最低でも$1以上です。"],
            maxLength: ["max", "$1","最高でも$1文字以下です。"]
          }
        }
      }
    }
  },
  ignoreNoDocuments: true,
};
export default config;
