require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const select = `
    select "name",
           "price",
           "image",
           "shortDescription",
           "productId"
      from "products";
  `;
  db.query(select)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', express.json(), (req, res, next) => {
  const id = parseInt(req.params.productId, 10);
  const selectId = `
    select "name",
           "price",
           "image",
           "shortDescription",
           "longDescription",
           "productId"
      from "products"
     where "productId" = $1;
  `;
  db.query(selectId, [id])
    .then(result => {
      if (!result.rows[0]) {
        return next(new ClientError('The productId does not exist', 404));
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const select = `
    select *
      from "carts";
  `;
  db.query(select)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/cart', express.json(), (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!productId || productId < 1) {
    return next(new ClientError('The productId must be a postive integer', 400));
  }
  const select = `
    select "price"
      from "products"
     where "productId" = $1
  `;
  db.query(select, [productId])
    .then(result => {
      if (!result.rows[0]) return next(new ClientError('The productId does not exist', 404));
      const insert = `
        insert into "carts" ("cartId", "createdAt")
             values (default, default)
          returning "cartId";
      `;
      const newResult = result.rows[0];
      db.query(insert)
        .then(result => {
          res.json(Object.assign(newResult, result.rows[0]));
        })
        .catch(err => next(err));
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
