const express = require("express");
const app = express();
const axios = require("axios");
const Category = require("../modals/categoriesModal");

app.get("/getCategories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/addCategory", async (req, res) => {
  try {
    const { name, image } = req.body;

    const newCategory = new Category({
      name,
      image,
      ...req.body,
    });
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/addMultipleCategories", async (req, res) => {
  try {
    const { categories } = req.body;
    const newCategories = await Category.insertMany(categories);
    res.status(200).json(newCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/updateCategory", async (req, res) => {
  try {
    const { id, name, image } = req.body;
    const category = await Category.findOne(
      {
        id,
        $set: {
          name,
          image,
          ...req.body,
        },
      },
      { new: true }
    );

    // await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/updateMultipleCategories", async (req, res) => {
  try {
    const { categories } = req.body;
    const updatedCategories = await Category.bulkWrite(
      categories.map((category) => ({
        updateOne: {
          filter: { id: category.id },
          update: { $set: { ...category } },
        },
      }))
    );
    res.status(200).json(updatedCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/updateMultipleCategoriesNav", async (req, res) => {
  try {
    // const { categories } = req.body;
    const updatedCategories = await Category.updateMany(
      {
        $set: { navigationScreen: "Products" },
      },
      { new: true }
    );

    res.status(200).json(updatedCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteCategory", async (req, res) => {
  try {
    const { id } = req.body;
    const category = await Category.findOne({
      id,
    });
    await category.delete();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteAllCategories", async (req, res) => {
  try {
    await Category.deleteMany({});
    res.status(200).json("All categories deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = app;
