declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GIFS_API_URL: string;
      REACT_APP_GIFS_API_KEY: string;
    }
  }
}

export {};
