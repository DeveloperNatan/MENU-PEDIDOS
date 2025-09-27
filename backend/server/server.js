const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const PORT = process.env.PORT;

app.use(cors());
app.use(
  session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/src/")));
app.use(
  "/assets",
  express.static(path.join(__dirname, "frontend/src/views/assets"))
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/routes"));

app.listen(PORT);
