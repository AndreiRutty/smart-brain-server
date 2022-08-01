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

const PORT = process.env.PORT || 3000;

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "150203",
    database: "smart-brain",
  },
});

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

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
