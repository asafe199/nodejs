const rabbitmq = require('../lib/common/rabbitmq');

class NotificationServices {

    sending(body){
        rabbitmq.sendingToQueue(body);
    }

    consuming(fn)  {
        let func = (msg) => {
            let result = msg.content.toString();
            console.log("[x] Received %s", result);
            fn(result);
        }
        rabbitmq.consumingFromQueue(func);
    }
}

module.exports = NotificationServices
