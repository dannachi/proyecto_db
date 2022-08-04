const express = require("express");
const router = express.Router();
const connect = require('./db_pool_connect');

router.get('/', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM toy inner join pet on toy.pet_id = pid natural join ptype ORDER BY tid ;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      //console.log(result.rows);
      //rows = result.rows;
      //console.log(rows);
      res.render('verToy', { rows: result.rows })
    });
  });
});

router.get('/crear', (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM pet natural join ptype ORDER BY pid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.render('crearToy', { rows: result.rows});
    });
  });
});

router.post('/crear', (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`INSERT INTO toy (tname, color, pet_id) VALUES ('${req.body.tname}', '${req.body.color}', '${req.body.pet_id}');`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/actualizar', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM toy inner join pet on toy.pet_id = pid ORDER BY tid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      //console.log(result.rows);
      //rows = result.rows;
      //console.log(rows);
      res.render('actualizarToy', { rows: result.rows })
    });
  });
});

router.post('/actualizar', (req, res) => {
  console.log(req.body)
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`UPDATE toy SET tname = '${req.body.tname}', color ='${req.body.color}', pet_id = '${req.body.pet_id}' WHERE tid = '${req.body.tid}';`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/eliminar', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM toy inner join pet on toy.pet_id = pid ORDER BY tid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      //console.log(result.rows);
      //rows = result.rows;
      //console.log(rows);
      res.render('eliminarToy', { rows: result.rows })
    });
  });
});

router.post('/eliminar', (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`DELETE FROM toy WHERE tid = '${req.body.tid}';`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
});

module.exports = router;