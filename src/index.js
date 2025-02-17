const express = require('express');
const { logger } = require("./lib/common/pino-logger")

const app = express();
const port = process.env.EXPRESS_PORT || 3000;
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`URL : ${req.url}, Timestamp: ${Date.now()}`)
    next()
})

app.use('/notification', require('./controller/notification-controller'));
app.use('/email', require('./controller/mail-controller'));

app.get('/', (req, res) => {
    res.status(200);
})

app.listen(port, ()=> {
    logger.info(`Running on Port ${port}`);
})