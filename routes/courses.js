
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

    const query = 'SELECT * FROM [dbo].[stbl_course];';

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

module.exports = router;
