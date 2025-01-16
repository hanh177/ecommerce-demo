"use strict";

const { SuccessResponse } = require("../core/success.response");
const ProductService = require("../servivces/product.service");

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new product success!",
      metadata: await ProductService.createProduct(req.body),
    }).send(res);
  };
}

module.exports = new ProductController();
