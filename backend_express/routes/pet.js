const express = require('express');
const router = express.Router();
const connect = require('./db_pool_connect');

router.get('/', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`SELECT * FROM pet natural join ptype ORDER BY pid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      res.render('verPet', {rows: result.rows })
    });
  });
});

router.get('/crear', (req, res, next) => {
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
      res.render('crearPet', {rows: result.rows })
    });
  });
})

router.post('/crear', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`INSERT INTO pet(pet_name, age, tyid) VALUES ('${req.body.pet_name}', '${req.body.age}', '${req.body.tyid}');`, function (err, result) {
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
    client.query(`SELECT * FROM pet natural join ptype ORDER BY pid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      res.render('actualizarPet', {rows: result.rows })
    });
  });
});

router.post('/actualizar', (req, res) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`UPDATE pet SET pet_name = '${req.body.pet_name}', age ='${req.body.age}', tyid = '${req.body.tyid}' WHERE pid = '${req.body.pid}';`, function (err, result) {
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
    client.query(`SELECT * FROM pet natural join ptype ORDER BY pid;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        //return console.error('error running query', err);
      }
      res.render('eliminarPet', {rows: result.rows })
    });
  });
})

router.post('/eliminar', (req, res, next) => {
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    //use the client for executing the query
    client.query(`DELETE FROM pet WHERE pid = '${req.body.pid}';`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if (err) {
        return console.error('error running query', err);
      }
      res.send(JSON.stringify(result));
    });
  });
});

module.exports= router;