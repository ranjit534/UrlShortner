const { urlencoded } = require("express");
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const router = require("./router/route");

const app = express();
app.use(express.json()); //Inbuilt middleware which is used to parse the request body and also check the content type header.
app.use(cors());

const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://ranjit121220:fEPT7Uku15vJfehm@cluster0.qdr0amw.mongodb.net/urlShortner?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(router); //It is used to make a middleware run globally.

app.listen(port, () => {
  console.log(`Running succesfully on the port ${port}.`);
});
