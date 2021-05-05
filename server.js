require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productsV1 = require('./routes/product.v1.router');
const cartsV1 = require('./routes/carts.v1.router');
const wishlistsV1 = require('./routes/wishlists.v1.router');
const usersV1 = require('./routes/users.v1.router');
const addressesV1 = require('./routes/addresses.v1.router');

const routeNotFoundHandler = require('./middlewares/route-not-found-middleware');
const commonErrorHandler = require('./middlewares/common-error-handler-middleware');
const initializeDbConnection = require('./db/mongodb.connect');

const app = express();
const port = 3000;

initializeDbConnection();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the 👨‍🍳 kiti-store base route :)</h1>');
});

// app.use('v1/products', productsV1);
// app.use('v1/carts', cartsV1);
// app.use('v1/wishlists', wishlistsV1);
// app.use('v1/users', usersV1);
// app.use('v1/users', addressesV1);

/** 
 * 404 Route handler
 * Do not move. This should be after all routes.
*/
app.use(routeNotFoundHandler);

/**
 * Error handler
 * Do not move.
 */
app.use(commonErrorHandler);


app.listen(process.env.LOCAL_PORT || port, () => {
    console.log(`⚡ Server is up and running`);
});


