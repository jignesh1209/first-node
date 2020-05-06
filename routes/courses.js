
var express = require('express');
var router = express.Router();
const sql = require("mssql/msnodesqlv8");

const handleError = (req, res, error) =>
  req.app.handleError(res, error, 'Course.js');


const sqlConnection = {
  "server": process.env.DB_SERVER,
  "port": parseInt(process.env.DB_PORT),
  "driver": "msnodesqlv8",
  "database": "LearningDB",
  "options": {
    "trustedConnection": true
  }
};

/* GET course listing. */
router.get('/', async function (req, res, next) {
  try {
    console.log(JSON.stringify(sqlConnection, null, 8), 'CONNECTION');
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    var request = new sql.Request(connection);

    const query = 'SELECT * FROM [dbo].[tbl_course];';

    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    console.log('catch');
    handleError(req, res, err);
  }
});

router.get('/:id', async function (req, res) {
  try {
    console.log(JSON.stringify(sqlConnection, null, 8), 'CONNECTION');
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    var request = new sql.Request(connection);
    console.log(req.params, 'REQUEST');
    const query = `SELECT * FROM [dbo].[tbl_course] WHERE [id]=${req.params.id};`;

    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        console.log(err, 'ERRROR');
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    console.log('catch');
    handleError(req, res, err);
  }
});

router.post('/', async function (req, res) {
  try {
    console.log(JSON.stringify(sqlConnection, null, 8), 'CONNECTION');
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    var request = new sql.Request(connection);

    const query = `INSERT INTO dbo.tbl_course
    (name) VALUES ('${req.body.name}')`;

    console.log(query);
    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        console.log(err, 'ERROR');
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    console.log(err, 'catch');
    handleError(req, res, err);
  }
});

router.put('/update/:id', async function (req, res) {
  try {
    console.log(JSON.stringify(sqlConnection, null, 8), 'CONNECTION');
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    var request = new sql.Request(connection);

    const query = `UPDATE dbo.tbl_course SET
    name='${req.body.name}'
    WHERE id=${req.params.id}`;

    console.log(query);
    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        console.log(err, 'ERROR');
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    console.log(err, 'catch');
    handleError(req, res, err);
  }
});

router.delete('/delete/:id', async function (req, res) {
  try {
    console.log(JSON.stringify(sqlConnection, null, 8), 'CONNECTION');
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    var request = new sql.Request(connection);

    const query = `DELETE dbo.tbl_course WHERE id=${req.params.id}`;

    console.log(query);
    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        console.log(err, 'ERROR');
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    console.log(err, 'catch');
    handleError(req, res, err);
  }
});

module.exports = router;
