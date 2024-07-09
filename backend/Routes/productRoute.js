const express = require("express");
//h
const { create, deleteProduct } = require("../controller/productController");

const productRoute = express.Router();

productRoute.post("/create", create);
productRoute.delete("/delete/:id", deleteProduct);

module.exports = productRoute;
