let redis = require("redis");
let events = require("events");

// const redisOptions = {
//     host: process.env.REDIS_URL || "localhost",
//     port: process.env.REDIS_PORT, //6379,
//     options: {},
//     retry_strategy(options) {
//         console.log("[Redis] going to reconnect after: " + Math.min(options.attempt * 100, 3000));
//         return Math.min(options.attempt * 100, 3000);
//     }
// };

/*function*/class RedisClientAux/*(redisOptions)*/ {
    constructor(redisOptions) {
        // TODO - fail if no options are set?

        this.options = redisOptions;
        this.redisClient = redis.createClient(redisOptions);
        this.eventEmitter = new events();

        this.redisClient.on("ready", () => {
            console.log("[Redis] Ready");
            this.eventEmitter.emit("connected");
        });

        this.redisClient.on("error", (error) => {
            console.log("[Redis] Error: " + error);
            eventEmitter.emit("error", error);
        });
    }

    // TODO - introduce set with expiry key
    set(key, value/*, expireSeconds*/) {
//         if (!expireSeconds) {
//             expireSeconds = 1;
//         }


        return new Promise((resolve, reject) => {
            this.redisClient.set(key, value, /*"EX", expireSeconds,*/ (error, result) => {
                if (error) {
                    console.log("[Redis:ERROR] %s", error.message);
                    return reject(error);
                }
                return resolve();
            });
        });
    };

    get(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, (error, result) => {
                if (error) {
                    console.log("[Redis:ERROR] %s", error.message);
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }
};

module.exports = RedisClientAux;