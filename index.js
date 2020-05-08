require('dotenv').config();
const winston = require('./config/winston');
const express = require('express');

const app = express();
const coursesRoute = require('./routes/courses');

app.use(express.json());
app.use('/api/courses', coursesRoute);

app.handleError = async (res, error, fileName) => {
    const errorDetails = `${error}`;
    // add this line to include winston logging
    winston.error(`${fileName} - ${error.status || 500} - ${error.message}`);

    res.status(500).json({ errorDetails, 'fileName': fileName });
};


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening the port ${PORT}..`);
});

