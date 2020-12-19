const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cocktails = require("./app/cocktails");
const users = require("./app/users");
const app = express();
const port = 8000;
const config = require("./config");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const run = async () => {
    await mongoose.connect(config.db.url + "/" + config.db.name,  { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

    app.use("/users", users);
    app.use("/cocktails", cocktails);
    console.log("Connected to mongo DB");

    app.listen(port, () => {
        console.log(`Server started at http://localhost:8000`);
    });
};

run().catch(console.log);