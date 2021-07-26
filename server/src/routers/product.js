const express = require("express");
const Product = require("../models/product");
const router = new express.Router();
const multer = require("multer");
const { uuid } = require("uuidv4");
const auth = require("../middleware/auth");

const DIR = "./uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/product", upload.single("productImg"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productImg: url + "/uploads/" + req.file.filename,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "product registered successfully!",
        productCreated: {
          product,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

router.post("/products", async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/products/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/products/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "name", "price"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const product = await Product.findById(req.params.id);

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).send();
    }

    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
