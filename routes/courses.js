
const express = require('express');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

const handleError = (req, res, error) =>
  req.app.handleError(res, error, 'Course.js');


const sqlConnection = {
  "server": process.env.DB_SERVER,
  //"port": parseInt(process.env.DB_PORT),
  "driver": process.env.DB_DRIVER,
  "database": process.env.DB_DATABASE,
  "user": process.env.DB_USER,
  "password": process.env.DB_PASS
};

/* GET course listing. */
router.get('/', async function (req, res) {
  try {
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    const request = new sql.Request(connection);
    const query = 'SELECT * FROM [dbo].[stbl_course];';
    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        res.send(err);
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    handleError(req, res, err);
  }
});

router.get('/:id', async function (req, res) {
  try {
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    const request = new sql.Request(connection);
    const query = `SELECT * FROM [dbo].[tbl_course] WHERE [id]=${req.params.id};`;

    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    handleError(req, res, err);
  }
});

router.post('/', async function (req, res) {
  try {
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    const request = new sql.Request(connection);

    const query = `INSERT INTO dbo.tbl_course
    (name) VALUES ('${req.body.name}')`;

    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    handleError(req, res, err);
  }
});

router.put('/update/:id', async function (req, res) {
  try {
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    const request = new sql.Request(connection);

    const query = `UPDATE dbo.tbl_course SET
    name='${req.body.name}'
    WHERE id=${req.params.id}`;

    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    handleError(req, res, err);
  }
});

router.delete('/delete/:id', async function (req, res) {
  try {
    const connection = await new sql.ConnectionPool(sqlConnection).connect();

    // create Request object
    const request = new sql.Request(connection);

    const query = `DELETE dbo.tbl_course WHERE id=${req.params.id}`;

    // query to the database and get the records
    request.query(query, function (err, result) {
      if (err) {
        handleError(req, res, err);
      }
      // send records as a response
      res.send(result);

    });
  } catch (err) {
    handleError(req, res, err);
  }
});

module.exports = router;
