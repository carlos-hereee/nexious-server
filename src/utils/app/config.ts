export const port = process.env.PORT || "0000";
export const uri = process.env.MONGOOSE_URI || "";
export const clientUrl = process.env.CLIENT_URL || "";
export const clientUrlAlt = process.env.CLIENT_URL_ALT || "";
export const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev";
export const isProduction = process.env.NODE_ENV === "production" || false;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";
export const appSecret = process.env.APP_SECRET || "";
export const accessTokenName = process.env.COOKIE_NAME || "";
export const refreshTokenName = process.env.COOKIE_NAME_2 || "";
export const mongooseUser = process.env.MONGOOSE_USERNAME || "";
export const mongoosePassword = process.env.MONGOOSE_PASSWORD || "";
export const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || "";
export const jwtPublicKey = process.env.JWT_PUBLIC_KEY || "";
export const appId = process.env.APP_ID || "";
export const baseUrl = process.env.BASE_URL || "";
export const translatorKey = process.env.TRANSLATOR_AKI_KEY || "";
export const cookieDomain = process.env.COOKIE_DOMAIN || "";
// aws
export const awsBucketName = process.env.AWS_BUCKET_NAME || "";
export const awsImageUrl = process.env.AWS_IMAGE_URL || "";
export const awsRegion = process.env.AWS_REGION || "us-east-1";
export const awsConsoleLogin = process.env.AWS_CONSOLE_LOGIN || "";
export const awsUsername = process.env.AWS_USERNAME || "";
export const awsPassword = process.env.AWS_PASSWORD || "";
export const awsSecretKey = process.env.AWS_SECRET_KEY || "";
export const awsAccessKey = process.env.AWS_ACCESS_KEY || "";
export const awsApiVersion = process.env.AWS_ACCESS_KEY || "";
// stripe
export const stripeAccessKey = process.env.STRIPE_ACCESS_KEY || "";
export const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
export const stripeEndpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";
export const stripeRefreshUrl = process.env.STRIPE_REFRESH_URL || "";
export const stripeReturnUrl = process.env.STRIPE_RETURN_URL || "";
export const appEmail = process.env.APP_EMAIL || "";
// express
export const allowedMethods = ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"];
