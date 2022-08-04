const express = require('express');
const router = express.Router();
const connect = require('./db_pool_connect');

router.get('/', async (req, res, next) => {
  //const rows = await selectPtype();
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM ptype ORDER BY tyid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      res.render('verPtype', { rows: result.rows })
    });
  });
});

router.get('/crear', (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM ptype ORDER BY tyid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      res.render('crearPtype', { rows: result.rows })
    });
  });
})

router.post('/crear', (req, res) => {
  console.log(req.body);
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`INSERT INTO ptype(ttype, breed, type_description) VALUES ('${req.body.ttype}', '${req.body.breed}', '${req.body.type_description}');`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
})

router.get('/actualizar', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM ptype ORDER BY tyid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      res.render('actualizarPtype', { rows: result.rows })
    });
  });
});

router.post('/actualizar', (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`UPDATE ptype SET ttype = '${req.body.ttype}', breed ='${req.body.breed}', type_description = '${req.body.type_description}' WHERE tyid = '${req.body.tyid}';`, function (err, result) {
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
    client.query(`SELECT * FROM ptype ORDER BY tyid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      res.render('eliminarPtype', { rows: result.rows })
    });
  });
});

router.post('/eliminar', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`DELETE FROM ptype WHERE tyid = '${req.body.tyid}';`, function (err, result) {
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