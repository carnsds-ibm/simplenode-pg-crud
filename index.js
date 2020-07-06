const express = require('express')
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json())
app.use('/', router)
app.listen(3000);
