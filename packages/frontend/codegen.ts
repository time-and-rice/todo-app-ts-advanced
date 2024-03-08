import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../backend/schema.graphql",
  documents: ["src/**/*.{js,jsx,ts,tsx,graphql}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        enumsAsTypes: true,
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
};

export default config;
