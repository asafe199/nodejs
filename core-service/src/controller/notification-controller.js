const express = require('express')
const router = express.Router()

const NotificationDTOInstance = require('../dto/notification-dto')
const NotificationInstance  = require('../../../mail-service/src/services/notification-service')

const Notification = new NotificationInstance()
const NotificationDTO= new NotificationDTOInstance()


router.post('/', (req, res) => {
    const hasError = NotificationDTO.hasAnyError(req.body)
    if(hasError){
        res.status(400).send(hasError);
        return;
    }
    Notification.sending(req.body)
    res.status(201).send({"msg": "Notification has been sent."})
})

module.exports = router