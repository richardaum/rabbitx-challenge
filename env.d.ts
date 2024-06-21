declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ENV: "test" | "production";
      NEXT_PUBLIC_TEST_TOKEN: string;
      NEXT_PUBLIC_PROD_TOKEN: string;
    }
  }
}

export {};
