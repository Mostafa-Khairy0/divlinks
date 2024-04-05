// Require necessary modules
var createError = require("http-errors");
var express = require("express");
var path = require("path");

// Initialize express app
var app = express();

// Middleware for parsing JSON and URL-encoded data, and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Multer setup for handling file uploads
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

// UUID generation for profile IDs
const { v4: uuid } = require("uuid");

// Edit JSON file for storing data
const editJsonFile = require("edit-json-file");
const file = editJsonFile("./data.json");
const profiles = file.get("profiles");

// Route for creating new profiles
app.post(
  "/profiles",
  upload.single("image", { mimetype: "image/*" }), // Handle image upload
  (req, res) => {
    // Extract data from request body
    const {
      file: { filename: image },
    } = req;
    const { firstName, lastName, email, links } = req.body;

    if (!(firstName && lastName && email && links && image)) createError(401); // Unauthorized if required data is missing
    links = links?.filter((link) => link?.url > 0);
    const profile = {
      id: uuid(),
      firstName,
      lastName,
      email,
      links,
      image,
    };
    // Validate data and add new profile
    profiles.push(profile);
    file.save(); // Save changes to JSON file
    res.json({ profile }); // Respond with success message
  }
);

// Route for retrieving a specific profile
app.get(
  "/profiles/:id",
  upload.single("image", { mimetype: "image/*" }), // Handle image upload
  (req, res) => {
    const { id } = req.params;
    const profile = profiles.find((profile) => profile.id == id);
    if (profile) res.json({ profile }); // Respond with the profile if found
    else createError(404); // Not Found if profile not found
  }
);

module.exports = app; // Export the express app
