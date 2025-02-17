const nodemailer = require('nodemailer');
const { logger } = require('./pino-logger')

class Nodemailer {

    #transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
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
