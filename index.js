require("dotenv").config();

require("./config/db");

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const io = require("socket.io");
const history = require("connect-history-api-fallback");

const initListeners = require("./listeners");
const initEvents = require("./events");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const socket = io(server, {
  serveClient: false,
  cors: {
    origin: true,
    credentials: true,
  },
});

initEvents();
initListeners(socket);

app.use(history());
app.use(express.static("./client/dist"));

app.get("/", (req, res) => {
  res.sendFile("./client/dist/index.html");
});

server.listen(PORT, () => console.log(`Listening on http://0.0.0.0:${PORT}`));
