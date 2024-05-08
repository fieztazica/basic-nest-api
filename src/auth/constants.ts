import { passportJwtSecret } from 'jwks-rsa';

const jwtConstants = {
  secret: process.env.JWT_SECRET,
  secretOrKeyProvider: passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_ISSUER_URL}`,
  // 1 hour in seconds
  defaultExpiresIn: 60 * 60,
  // 1 day in seconds
  defaultRememberMeExpiresIn: 60 * 60 * 24,
  // 1 month in seconds
  defaultRefreshTokenExpiresIn: 60 * 60 * 24 * 30,
};

export { jwtConstants };
