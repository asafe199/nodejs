const express = require('express')
const NotificationInstance  = require('../services/notification-services')
const NotificationDTO = require('../dto/notification-dto')
const Notification = new NotificationInstance()
const router = express.Router()

router.post('/', (req, res) => {
    const hasError = NotificationDTO.hasAnyError(req.body);
    if(hasError){
        res.status(400).send(hasError);
        return;
    }
    Notification.sending(req.body);
    res.status(201).send({"msg": "Notification has been sent."});
})

module.exports = router