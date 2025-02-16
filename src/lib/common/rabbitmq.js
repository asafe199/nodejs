const amqp = require('amqplib/callback_api');
const processQueue = process.env.RABBITMQ_QUEUE;

const _connect = (func) => {
    amqp.connect(process.env.RABBITMQ_URL, function (err, connection) {
        if (err) throw err;
        connection.createChannel(func)
    });
}

const sendingToQueue = (msg) => {
    const funcChannel = function(err, channel) {
        if (err) throw err;

        channel.assertQueue(processQueue, {
            durable: false,
        });
        msg = JSON.stringify(msg);
        channel.sendToQueue(processQueue, Buffer.from(msg), {
            persistent: true
        });
        console.log(`[x] Sent ${msg}`);
    };
    _connect(funcChannel);
}

const consumingFromQueue = (func) => {
    const funcChannel = async function(err, channel) {
        if (err) throw err;

        await channel.assertQueue(processQueue, {
            durable: false
        });
        await channel.consume(processQueue, func, {
            noAck: true
        });
    }
    _connect(funcChannel);
}

module.exports = {
    sendingToQueue, consumingFromQueue
}