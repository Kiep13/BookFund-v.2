export const environment = {
  production: true,

  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  databaseHost: process.env.DATABASE_HOST,
  databaseName: process.env.DATABASE_NAME,
  databaseUsername: process.env.DATABASE_USERNAME,
  databasePassword: process.env.DATABASE_PASSWORD,

  clientUrl: process.env.CLIENT_URL,
  selfUrl: process.env.SELF_URL,
  imagesFolder: 'assets/images',
  booksFolder: 'assets/books',
  articlesFolder: 'assets/articles',

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubState: process.env.GITHUB_STATE,

  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
};
