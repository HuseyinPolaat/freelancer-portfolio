const express = require("express");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const project = require('./models/Project');
const methodOverride = require("method-override");
const pageRouters = require("./routers/pageRouters");
const projectRouters = require('./routers/projectRoutes');


const app = express();

//connectDB
mongoose
  .connect("mongodb+srv://huseyin:OCXFpvTTAT5KtuJ8@cluster0.h1pbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));

//routers
app.use("/", pageRouters);
app.use('/', projectRouters);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
