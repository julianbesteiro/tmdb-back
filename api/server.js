const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const routes = require("./routes");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://tmdb-front-ivory.vercel.app"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/api", routes);

const PORT = 3001;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});
