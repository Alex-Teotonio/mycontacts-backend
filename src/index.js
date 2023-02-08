const express = require('express');
const cors = require('./app/middlewares/cors');
const errorHandle = require('./app/middlewares/errorHandle');
const routes = require('./routes');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandle);

app.listen(3003, () => console.log('Server is running!'));
