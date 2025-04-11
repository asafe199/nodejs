const RabbitMQ = require('../../../common-shared/src/services/rabbitmq');
const { logger } = require('../../../core-service/src/lib/common/pino-logger')
class NotificationService {

    constructor() {
        this.rabbitMQ = new RabbitMQ();
    }

    sending(body){
        this.rabbitMQ.sendingToQueue(body);
    }

    consuming(fn)  {
        this.rabbitMQ.consumingFromQueue(function (msg) {
            logger.info(msg);
        });
    }
}

module.exports = NotificationService
