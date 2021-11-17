const nodemailer = require("nodemailer");
const Project = require("../models/Project");

exports.getIndexPage = async (req, res) => {
  const projects = await Project.find({});
  res.status(200).render("index", {
    projects,
  });
};

exports.getAddPage = async (req, res) => {
  res.status(200).render("add");
};

exports.getEditPage = async (req, res) => {
  const project = await Project.findById({ _id: req.params.id });
  res.status(200).render("edit", { project });
};

exports.sendEmail = async (req, res) => {
  const outputMessage = `

    <h1> Mail Details <h1/>

    <ul>
      <li> Name : ${req.body.name} </li>
      <li> Email : ${req.body.email} </li>  
    </ul>

    <h3> Message <h3/>

    <p> ${req.body.message} </p>
  `;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "example@gmail.com",
      pass: "password", 
    },
  });

  let info = await transporter.sendMail({
    from: '"Freelancer Concact Form" <usainpolat@gmail.com>',
    to: `${req.body.email}`,
    subject: "Freelancer Concact Form New Message ✔", 
    html: outputMessage,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.status(200).redirect("/");
};
