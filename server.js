const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

app.get("/", (req, res) => res.send("It is working!"));

//Sign In
app.post("/signin", (req, res) => signin.handleSignIn(req, res, db, bcrypt));

//Register
app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

//Getting user profile
app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

//Image Entries
app.put("/image", (req, res) => image.handleIamge(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
