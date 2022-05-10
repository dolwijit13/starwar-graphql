export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  starwarApi: process.env.STARWAR_API,
});
