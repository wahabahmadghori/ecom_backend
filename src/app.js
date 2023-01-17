const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRouter = require("./routers/categories");
const orderRouter = require("./routers/orders");
const productRouter = require("./routers/products");
const userRouter = require("./routers/users");
const errorHandler = require('./helpers/error_handler')
const expressJwt = require('./helpers/jwt')
const app = express();

require("dotenv/config");
const api_url = process.env.API_URL;

app.use(cors());
app.options("*", cors());


//app middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(expressJwt());
app.use(errorHandler)



//app router
app.use(`${api_url}/categories`, categoryRouter);
app.use(`${api_url}/orders`, orderRouter);
app.use(`${api_url}/products`, productRouter);
app.use(`${api_url}/users`, userRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Established Connection");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("server is running at port http://localhost:3000");
});
