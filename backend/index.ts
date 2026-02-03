// Config

// Express setup
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Router triggering
const mainRouter = require("./routes/mainRouter");
app.use("/", mainRouter);

const db = require("./db/queries");

// Launch and port confirmation
app.listen(process.env.PORT, () =>
  console.log(`Listeining on port ${process.env.PORT}`)
);