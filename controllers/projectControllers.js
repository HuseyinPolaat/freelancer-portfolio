const express = require("express");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const Project = require("../models/Project");

const app = express();
app.use(fileUpload());

exports.createProject = async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Project.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
};

exports.updateProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });

  project.name = req.body.name;
  project.description = req.body.description;
  project.save();

  res.redirect("/");
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById({ _id: req.params.id });

  let deletedImage = __dirname + "/../public" + project.image;

  if (fs.existsSync(deletedImage)) {
    fs.unlinkSync(deletedImage);
  }

  await Project.findByIdAndRemove(req.params.id);

  res.redirect("/");
};
