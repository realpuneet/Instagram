const Redis = require("ioredis");

const cacheClient = new Redis(process.env.REDIS_HOST);

cacheClient.on("connect", () => {
  console.log("redis connected successfully");
});

cacheClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = cacheClient;