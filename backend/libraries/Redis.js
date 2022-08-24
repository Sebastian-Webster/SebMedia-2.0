const redis = require('redis');
const Logger = require('./Logger');
const logger = new Logger();

class Redis {
    constructor() {
        (async () => { //IIFE - Immediately Invoked Function Expression
            this.redisClient = redis.createClient();
          
            this.redisClient.on("error", logger.error);
          
            await this.redisClient.connect();
        })();
    }

    setCache = (key, value) => {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, JSON.stringify(value))
            .then(() => resolve())
            .catch(reject)
        })
    }

    getCache = async (key) => {
        try {
            return await this.redisClient.get(key)
        } catch (error) {
            logger.error(error)
            return undefined
        }
    }

    updateCache = (key, value) => {

    }
}