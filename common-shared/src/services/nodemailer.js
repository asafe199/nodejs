const nodemailer = require('common-shared/src/services/nodemailer');
const { logger } = require('../../../core-service/src/lib/common/pino-logger')

class Nodemailer {

    #transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'asafe.adm@gmail.com',
            pass: 'ssecvfrdsowaqpoe'
        }
    })

    sendEmail = async (mailOptions) => {
        await this.#transporter.sendMail(mailOptions, function (er, info){
            if(!er){
                logger.info('Email sent: ' + info.response);
            } else {
                logger.error(er)
            }
        })
    }
}

module.exports = Nodemailer
