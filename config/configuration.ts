const isDevelopment = process.env.NODE_ENV === 'development';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  starwarApi: process.env.STARWAR_API,
  db: isDevelopment ? process.env.DB || 'starwar_graphql' : ':memory:',
  dbDialect: isDevelopment ? 'postgres' : 'sqlite',
  dbHost: isDevelopment ? process.env.DB_HOST || 'localhost' : undefined,
  dbPort: isDevelopment ? process.env.DB_PORT || 5432 : undefined,
  dbUsername: process.env.DB_USERNAME || undefined,
  dbPassword: process.env.DB_PASSWORD || undefined,
});
