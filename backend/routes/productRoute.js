const express = require("express");
const app = express();
const axios = require("axios");
const Product = require("../modals/productModal");

app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/addProduct", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const newProduct = new Product({
      name,
      price,
      image,
      description,
      ...req.body,
    });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/updateProduct", async (req, res) => {
  try {
    const { id, name, price, image, description } = req.body;
    const product = await Product.findOne({
      id,
    });
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteProduct", async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findOne({
      id,
    });
    await product.delete();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = app;
