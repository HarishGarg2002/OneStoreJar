const express = require("express");
const app = express();
const axios = require("axios");
const Cart = require("../modals/cartModal");

app.get("/getCart", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/addCart", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const newCart = new Cart({
      name,
      price,
      image,
      description,
      ...req.body,
    });
    await newCart.save();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/updateCart", async (req, res) => {
  try {
    const { id, name, price, image, description } = req.body;
    const cart = await Cart.findOne({
      id,
    });
    cart.name = name;
    cart.price = price;
    cart.image = image;
    cart.description = description;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteCart", async (req, res) => {
  try {
    const { id } = req.body;
    const cart = await Cart.findOne({
      id,
    });
    await cart.delete();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = app;
