var createError = require("http-errors");
var express = require("express");
var path = require("path");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const { v4: uuid } = require("uuid");

const editJsonFile = require("edit-json-file");
const file = editJsonFile("./data.json");
const profiles = file.get("profiles");

app.post(
  "/profiles",
  upload.single("image", { mimetype: "image/*" }),
  (req, res) => {
    const {
      file: { filename: image },
    } = req;
    const { firstName, lastName, email, links } = req.body;

    if (!(firstName && lastName && email && links && image)) createError(401);
    links = links?.filter((link) => link?.url > 0);
    const profile = {
      id: uuid(),
      firstName,
      lastName,
      email,
      links,
      image,
    };
    profiles.push(profile);
    file.save();
    res.json({ profile });
  }
);

app.get(
  "/profiles/:id",
  upload.single("image", { mimetype: "image/*" }),
  (req, res) => {
    const { id } = req.params;
    const profile = profiles.find((profile) => profile.id == id);
    if (profile) res.json({ profile });
    else createError(404);
  }
);

module.exports = app;
