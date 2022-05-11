export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  starwarApi: process.env.STARWAR_API,
  db: process.env.DB || 'starwar_graphql',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbUsername: process.env.DB_USERNAME || '',
  dbPassword: process.env.DB_PASSWORD || '',
});
