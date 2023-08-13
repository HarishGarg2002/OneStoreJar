const express = require("express");
const app = express();

const Animation = require("../modals/mainAnimationModal");

app.get("/getAnimation", async (req, res) => {
  try {
    const animation = await Animation.find();
    res.status(200).json(animation);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/addAnimation", async (req, res) => {
  try {
    const { firstText, secondText, image } = req.body;
    const newAnimation = new Animation({
      firstText,
      secondText,
      image,
      ...req.body,
    });
    await newAnimation.save();
    res.status(200).json(newAnimation);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/updateAnimation", async (req, res) => {
  try {
    const { id, firstText, secondText, image } = req.body;
    const animation = await Animation.findOne({
      id,
    });
    animation.firstText = firstText;
    animation.secondText = secondText;
    animation.image = image;
    await animation.save();
    res.status(200).json(animation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = app;
