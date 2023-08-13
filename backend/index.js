require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("./configs/db");
const { sendMail, getMessages } = require("./configs/gmail");
const path = require("path");
const http = require("http");
const httpServer = http.createServer(app);
const cors = require("cors");

const io = require("socket.io")(httpServer, {
  cors: {
    origin: [
      "http://localhost:19006",
      "http://localhost:3000",
      "http://192.168.1.5:3000",
      "http://192.168.215.163:19000",
      "http://192.168.47.163:19000",
    ],
  },
});

// io.on("connection", (socket) => {
//   console.log("Connected to server" + socket.id);
// });

// io.emit("message", (message) => {
//   console.log(message);
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:19006", credentials: true }));
app.use("/user", require("./routes/userRoute"));
app.use("/mainAnimation", require("./routes/mainAnimationRoute"));
app.use("/product", require("./routes/productRoute"));
app.use("/category", require("./routes/categoryRoute"));
app.use("/cart", require("./routes/cartRouter"));

// gmail
//   .sendMail()
//   .catch(console.error)
//   .then(() => {
//     console.log("Mail sent");
//   });

// getMessages()
//   .catch(console.error)
//   .then(() => {
//     console.log("Messages fetched");
//   });

io.on("connection", (socket) => {
  console.log("New client connected : Server  " + socket.id);
  socket.on("message", (message) => {
    console.log(socket.id);
    console.log(message);
    socket.emit("message-back", message);
  });
  socket.on("disconnect", (socket) => {
    console.log("Client disconnected : Server  " + socket.id);
  });
});

io.on("message", (message) => {
  console.log(message);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

httpServer.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
);

module.exports = io;
