declare namespace NodeJS {
  interface ProcessEnv {
    FindX_MONGODB_URL: string;
    LIVEKIT_API_KEY: string;
    LIVEKIT_API_SECRET: string;
    LIVEKIT_WS_URL: string;


    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_FROM: string;
  }
}
