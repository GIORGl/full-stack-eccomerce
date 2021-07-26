const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const cors = require("cors");
const app = express();

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

