const express = require('express')
const router = express.Router()

const MailServiceInstance = require('../services/mail-service');
const MailService = new MailServiceInstance()

router.get('/', (req, res) => {
    MailService.sendEmail();
    res.status(200).send({
        msg: "Email has been sent"
    })
})

module.exports = router