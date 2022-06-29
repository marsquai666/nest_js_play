declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHROME_PATH?: string;
    }
  }
}

export {}