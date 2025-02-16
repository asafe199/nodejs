const express = require('express');
const app = express();
const port = process.env.EXPRESS_PORT || 3000;
app.use(express.json());

app.use((req, res, next) => {
    console.log(`URL : ${req.url}, Timestamp: ${Date.now()}`)
    next()
})

app.use('/notification', require('./controller/notification-controller'));

app.get('/', (req, res) => {
    res.send({"msg": "Hello World"});
})

app.listen(port, ()=> {
    console.log(`Running on Port ${port}`);
})