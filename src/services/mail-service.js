const NodeMailerInstance = require('../lib/common/nodemailer')
const MailDTO = require('../dto/mail-dto')
const NotificationServiceInstance = require('../lib/common/rabbitmq');

const NodeMailer = new NodeMailerInstance();
const NotificationService = new NotificationServiceInstance();

class MailService {

    sendEmail = () => {
        NotificationService.consumingFromQueue(async function (result) {
            if(result){
                const data = JSON.parse(result);
                const mailDTO = new MailDTO(data.email, data.email, "Test", data.description);
                await NodeMailer.sendEmail(mailDTO.toJSON);
            }
        })
    }
}

module.exports = MailService;