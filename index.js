require('dotenv').config();
const morgan = require('morgan');
const winston = require('./config/winston');
const express = require('express');

const app = express();
const coursesRoute = require('./routes/courses');

app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));
app.use('/api/courses', coursesRoute);

const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' }
];

app.get('/', (req, res) => {
    res.send('Hello World!!!!!');
})

app.get('/api/course', (req, res) => {
    res.send(courses);
})

// /api/course/id
app.get('/api/course/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given id was not available!');
    res.send(course);
});

app.post('/api/course', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});



app.delete('/api/course/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given id was not available!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

app.handleError = async (res, error, fileName) => {
    const errorDetails = `${error}`;
    // add this line to include winston logging
    winston.error(`{err.status || 500} - ${error.message}`);

    res.status(500).json({ errorDetails, 'fileName': fileName });
};


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening the port ${PORT}..`);
});

