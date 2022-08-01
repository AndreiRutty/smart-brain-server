const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "a24a3deb4669466bb32a7e4e68e95271",
});

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).jon('unable to work with API'));
};

const handleIamge = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = { handleIamge, handleApiCall };
