const express = require("express");
const app = express();
const User = require("../modals/userModal");
const { sendMail } = require("../configs/gmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const io = require("../index");

let verified = false;
let resend = false;

app.post("/register", async (req, res) => {
  try {
    console.log(
      "-------------------------------------Hello-------------------------------------"
    );
    const { name, email, picture } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || user.isVerified === false) {
      if (user) {
        User.findOneAndDelete({ email })
          .then((data) => {
            console.log("deleted", data);
          })
          .catch(
            (err) => {
              console.log("error", err);
            },
            { new: true }
          );
      }
      const token = crypto.randomBytes(20).toString("hex");
      const newUser = new User({
        name,
        email,
        picture,
        emailToken: token,
      });
      var user_save = await newUser.save();
    }

    res.clearCookie("accessToken");
    const accessToken = jwt.sign(
      { id: user_save !== undefined ? user_save._id : user._id },
      process.env.JWT_SECRET
    );
    res.cookie("accessToken", accessToken, { httpOnly: true });

    console.log("user", user);
    if (
      (user !== null && user.isVerified !== true) ||
      user_save !== undefined
    ) {
      const url = `http://localhost:3000/user/verify-token?token=${user_save.emailToken}`;
      sendMail(email, url)
        .then(() => {
          console.log(email);
          res.status(200).send(`Email sent to user ${email}`);
        })
        .catch((err) => {
          res.status(500).json({
            message: `Error sending email to user ${email} due to ${err}`,
          });
        });
    } else {
      res.status(200).json({
        message: `User ${email} already exists`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/verify-token", async (req, res) => {
  try {
    const { token } = req.query;
    console.log(token);
    const user = await User.findOne({ emailToken: token });
    console.log(user.emailToken);
    if (!user) {
      res.status(400).json({ message: "Invalid token" });
    } else {
      user.isVerified = true;
      await user.save();
      res.status(200).render("verify");
    }
  } catch (error) {
    res.status(500).render("failverify");
  }
});

var timer;

app.get("/verify", async (req, res) => {
  try {
    const { email } = req.query;
    console.log("inside verify");

    let time = 0;
    const confirm = false;

    async function checkVerification() {
      User.findOne({ email }).then((user) => {
        console.log(user);
        console.log("email" + email);
        // console.log("user.isVerified" + user.isVerified);

        if (user.isVerified === true) {
          console.log("inside check true");
          res.status(200).json({ message: "verified" });
          res.end();
          clearTimeout(timer);
        } else {
          console.log("inside check false");
          time += 6000;
          if (time < 60000) {
            console.log("less than 60", time);
            timer = setTimeout(checkVerification, 6000);
          } else {
            console.log("more than 60", time);
            res.status(400).json({ message: "not verified" });
            res.end();
            clearTimeout(timer);
            return;
          }
        }
      });
    }

    checkVerification();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// }

app.put("/newEmailToken", async (req, res) => {
  try {
    console.log("hello");
    clearTimeout(timer);
    const email = req.body.email;
    const token = crypto.randomBytes(20).toString("hex");
    const user = await User.findOneAndUpdate({ email }, { emailToken: token });
    console.log(req.body.email);
    const url = `http://localhost:3000/user/verify-token?token=${token}`;

    sendMail(email, url)
      .then(() => {
        res.status(200).send(`Email sent to user ${email}`);
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error sending email to user ${email} due to ${err}`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;

// const token = req.cookies.accessToken;
// console.log(token);
// if (!token) {
//   res.status(400).json({ message: "Invalid token" });
// } else {
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);
//   if (!user) {
//     res.status(400).json({ message: "Invalid token" });
//   } else {
//     res.status(200).json({ message: "User verified" });
//   }
// }
// } catch (error) {
// res.status(500).json({ message: error.message });
