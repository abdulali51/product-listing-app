const express = require('express');
const app = express();
const productRoute = express.Router();

// Product model
let Product = require('../models/Product');

// Add Product
productRoute.route('/create').post((req, res, next) => {
  Product.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Products
productRoute.route('/products').get((req, res) => {
  Product.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      const array = transformRes(data);
      return res.json(array);
    }
  })
});

// Update Product
productRoute.route('/update/:id').put((req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      const obj = transformRes(data);
      console.log('Data updated successfully');
      return res.json(data);

    }
  })
});

// Transforming product response
function transformRes(res) {
  // const res = JSON.parse(JSON.stringify(obj));
  // console.log(res);
  if (Array.isArray(res)) {
    const transformedObj = res.map((object) => {
      const {_id, pname, costPrice, sellPrice, quantity, pid} = object;
      return {_id, pname, costPrice, sellPrice, quantity, pid};
    });
    return transformedObj;
  } else {
    const {_id, pname, costPrice, sellPrice, quantity, pid} = res;
    return {_id, pname, costPrice, sellPrice, quantity, pid};
  }
}

module.exports = productRoute;