const router = require("express").Router();
const config = require("../config");
const multer = require("multer");
const path = require("path");
const Cocktail = require("../models/Cocktail");
const { nanoid } = require('nanoid');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get("/published", async (req, res) => {
  try {
    const cocktails = await Cocktail.find({ published: true }).populate("userID");
    res.send(cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/published/:id", async (req, res) => {
  try {
    const cocktail = await Cocktail.findOne({ published: true, _id: req.params.id });
    res.send(cocktail);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/unpublished", [auth, permit('admin')], async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.send(cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/unpublished/:id", [auth, permit('admin')], async (req, res) => {
  try {
    const cocktails = await Cocktail.findOne({_id: req.params.id });
    res.send(cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/users-own-cocktails", auth, async (req, res) => {
  try {
    const cocktails = await Cocktail.find({ userID: req.user._id });
    res.send(cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/", [auth, upload.single("image")], async (req, res) => {
  const parsed = JSON.parse(req.body.ingredients);
  const cocktailData = req.body;
  if (req.file) {
    cocktailData.image = req.file.filename;
  };
  const data = {...cocktailData, ingredients: parsed};
  const newCocktail = new Cocktail(data);
  try {
    await newCocktail.save();
    res.send(newCocktail);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.put("/:cocktailID", [auth, permit('admin')], async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.cocktailID);
  if (cocktail) {
    try {
      await cocktail.updateOne({ published: true });
      res.send({ message: "The Cocktail was successfully published" });
    } catch (e) {
      res.status(500).send({ message: "Something Went Wrong" });
    };
  } else {
    res.status(403).send({ error: "The cocktail doesn't exist" });
  };
});

router.delete("/:cocktailID", [auth, permit("admin")], async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.cocktailID);
  if (cocktail) {
    try {
      await cocktail.remove();
      res.send({ message: "The Cocktail was successfully deleted" });
    } catch (e) {
      res.status(400).send({ message: "Something Went Wrong" });
    };
  } else {
    res.status(403).send({ error: "The Cocktail doesn't exist" });
  };
});



module.exports = router;