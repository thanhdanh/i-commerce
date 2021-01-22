export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    redis_host: process.env.REDIS_HOST,
    mongo_uri: process.env.MONGO_URI,
});