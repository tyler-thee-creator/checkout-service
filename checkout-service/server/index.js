const express = require('express');
const bodyParser = require('body-parser');
const port = 4003;
const app = express();
const dbQuery = require('../database/query.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/priceandinventory/id/:productId', (req, res) => {
  let productId = req.params.productId;
  dbQuery.getProductPriceAndInventoryCount(productId)
  .then((productInfo) => res.status(200).send(productInfo));
});

app.post('/priceandinventory/id/multiple', (req, res) => {
  let productIds = req.body;
  if (productIds.length > 30 || productIds.length === 0 || !productIds) {
    res.status(400);
  } else {
    dbQuery.getMultipleProductsPriceAndInventoryCount(productIds)
    .then(productsInfo => res.status(200).send(JSON.stringify(productsInfo)));
  }
});


app.listen(port, () => console.log(`listening on port ${port}`));