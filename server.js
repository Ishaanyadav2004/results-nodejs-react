const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const resultsRouter = require('./routes/results');

const app = express();
const port = 5000;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/results', resultsRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});