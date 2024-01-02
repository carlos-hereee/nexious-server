declare module "server-auth-types" {
  export type JWTPayloadProps = string | jwt.JwtPayload;
  export type JWTVerifyErrors = jwt.VerifyErrors;
  export interface JWTDecodedProps extends JWTPayloadProps {
    username?: string;
    sessionId?: string;
  }
}
