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
        return next(new ClientError('The productId does not exist.', 404));
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) return res.json([]);
  const select = `
    select "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
     where "c"."cartId" = $1
  `;
  db.query(select, [req.session.cartId])
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/cart', express.json(), (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!productId || productId < 1) {
    return next(new ClientError('The productId must be a postive integer.', 400));
  }
  const select = `
    select "price"
      from "products"
     where "productId" = $1
  `;
  db.query(select, [productId])
    .then(result => {
      if (!result.rows[0]) throw new ClientError('The productId does not exist.', 404);
      const insert = `
        insert into "carts" ("cartId", "createdAt")
             values (default, default)
          returning "cartId";
      `;
      const newResult = result.rows[0];
      if (req.session.cartId) {
        const selectCartId = `
          select "cartId"
            from "carts"
           where "cartId" = $1;
        `;
        return db.query(selectCartId, [req.session.cartId])
          .then(result => {
            return Object.assign(newResult, result.rows[0]);
          });
      } else {
        return db.query(insert)
          .then(result => {
            return Object.assign(newResult, result.rows[0]);
          });
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const insert = `
        insert into "cartItems" ("cartId", "productId", "price")
             values ($1, $2, $3)
          returning "cartItemId";
      `;
      const params = [result.cartId, productId, result.price];
      return db.query(insert, params)
        .then(result => result.rows[0]);
    })
    .then(result => {
      const selectItems = `
        select "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
         where "c"."cartItemId" = $1;
      `;
      return db.query(selectItems, [result.cartItemId])
        .then(result => res.status(201).json(result.rows[0]));
    })
    .catch(err => next(err));
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const cartItemId = parseInt(req.params.cartItemId, 10);
  if (!req.session.cartId) {
    next(new ClientError('There must be a cartId in session', 400));
  } else if (!cartItemId || cartItemId < 1) {
    next(new ClientError('The cartItemId must be a positive integer', 400));
  } else {
    const deleteCartItem = `
      delete from "cartItems"
            where "cartItemId" = $1
              and "cartId" = $2
        returning *;
    `;
    db.query(deleteCartItem, [cartItemId, req.session.cartId])
      .then(result => {
        return result.rows[0]
          ? res.sendStatus(204)
          : next(new ClientError('The cartItemId does not exist in the cartItems table', 400));
      })
      .catch(err => console.error(err));
  }
});

app.post('/api/orders', express.json(), (req, res, next) => {
  if (!req.session.cartId) throw new ClientError('A cartId must exist.', 400);
  if (!req.body.name && !req.body.creditCard && !req.body.shippingAddress) {
    throw new ClientError('The name, creditCard, and shippingAddress must be entered.', 400);
  } else if (!Number(req.body.creditCard)) {
    throw new ClientError('The creditCard must be a valid number with no spaces.', 400);
  } else if (!req.body.name) {
    throw new ClientError('The name must be entered.', 400);
  } else if (!req.body.shippingAddress) {
    throw new ClientError('The shippingAddress must be entered.', 400);
  }
  const insert = `
    insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
         values ($1, $2, $3, $4)
      returning "name",
                "creditCard",
                "shippingAddress",
                "createdAt",
                "orderId";
  `;
  const values = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  db.query(insert, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
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
