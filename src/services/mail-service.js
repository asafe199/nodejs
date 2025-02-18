const NodeMailerInstance = require('../lib/common/nodemailer')
const MailDTO = require('../dto/mail-dto')
const NotificationServiceInstance = require('../lib/common/rabbitmq');
const fs = require('fs')
const {logger} = require("../lib/common/pino-logger");
const {join} = require("node:path");

const NodeMailer = new NodeMailerInstance();
const NotificationService = new NotificationServiceInstance();

class MailService {

    sendEmail = () => {
        NotificationService.consumingFromQueue(async function (result) {
            if(result){
                const data = JSON.parse(result);
                await NodeMailer.sendEmail(new MailDTO(data.name, data.email, "Welcome!", html(data)));
            }

            function html(data) {
                try {
                    let html = fs.readFileSync(join(__dirname, '../lib/mail-template/hello.html'), 'utf-8');
                    html = html.replace("${name}", data.name).replace("${description}", data.description);
                    return html;
                } catch (e) {
                    logger.error(e);
                    throw e;
                }
            }
        })
    }
}

module.exports = MailService;