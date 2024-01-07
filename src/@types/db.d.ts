declare module "db-user" {
  export interface UserSchemaProps {
    username?: string;
    sessionId?: string;
    email?: string;
    all?: boolean;
    appId?: string;
    userId?: string;
  }
}
