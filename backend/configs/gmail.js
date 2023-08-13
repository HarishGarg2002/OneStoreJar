require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const app = require("express")();
const axios = require("axios");
var fs = require("fs");

require.extensions[".html"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

var data = require("./index.html");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_NEW;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(to_email, url) {
  try {
    const accessToken = new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) console.log(err); // Handling the errors
        else resolve(token);
      });
    });
    console.log("accessToken", accessToken);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "harishgarg951@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: '"Hi, Maanya" <hgarg1_be2@thapar.edu>',
      to: to_email,
      subject: "Verify your email address",
      text: "Dont Know",
      html: `Congrats To you for becoming a member of OneStoreJar. As we believe in full security of our users You have to Verify your email by clicking the above link ${url}`,
    };

    transport.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error Occurs");
        console.log(err);
      } else {
        console.log("Email sent");
        console.log("sendmail" + data);
      }
    });
  } catch (error) {
    console.log("last" + error.message);
    return error;
  }
}

const scopes = ["https://www.googleapis.com/auth/gmail.modify"];

google.options({
  auth: oAuth2Client,
});

const url = oAuth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

async function getMessages() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const userId = "harishgarg951@gmail.com";

    google.gmail;

    const messages = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log(messages);
  } catch (error) {
    console.log("message" + error.message);
  }
}

module.exports = { sendMail, getMessages };
