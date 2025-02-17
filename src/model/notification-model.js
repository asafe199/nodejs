const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    email: {
        type: String,
        required: true,
        max: 100
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 250
    }
})

module.exports = mongoose.model('Notification', NotificationSchema)