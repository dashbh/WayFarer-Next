
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  debug: true,
  schema: "http://localhost:3000/api/graphql",
  documents: ["src/graphql/**/*.ts"],
  generates: {
    "src/__generated__/": {
      preset: "client",
      plugins: []
    },
  }
};

export default config;
