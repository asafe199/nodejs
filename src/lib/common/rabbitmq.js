const amqp = require('amqplib/callback_api');
const processQueue = process.env.RABBITMQ_QUEUE;
const { logger } = require('./pino-logger')

class Rabbitmq {

    #connect = (func) => {
        amqp.connect(process.env.RABBITMQ_URL, function (err, connection) {
            if (err) throw err;
            connection.createChannel(func)
        });
    }

    sendingToQueue = (msg) => {
        const funcChannel = function(err, channel) {
            if (err) throw err;

            channel.assertQueue(processQueue, {
                durable: false,
            });
            msg = JSON.stringify(msg);
            channel.sendToQueue(processQueue, Buffer.from(msg), {
                persistent: true
            });
            logger.info(`[x] Sent ${msg}`);
        };
        this.#connect(funcChannel);
    }

    #consumingFromQueue = (func) => {
        const funcChannel = async function(err, channel) {
            if (err) throw err;

            await channel.assertQueue(processQueue, {
                durable: false
            });
            await channel.consume(processQueue, func, {
                noAck: true
            });
        }
        this.#connect(funcChannel);
    }

    consumingFromQueue = (fn) => {
        this.#consumingFromQueue(function (msg) {
            fn(msg.content.toString());
        });
    }
}

module.exports = Rabbitmq