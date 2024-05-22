const express = require('express')
const router = express.Router();
const menu = require("../models/menuiteam");

router.get("/", async function (req, res) {
    try {
      const data = await menu.find();
      console.log("success menuIteam fatch data");
      res.status(200).json(data);
    } catch (error) {
      console.log("error saving menuIteam", error);
      res.status(500).json({ error: "server error" });
    }
  });
  
  router.post("/", async function (req, res) {
    try {
      const data = req.body;
      const newPerson = new menu(data);
      const responce = await newPerson.save();
      console.log("success post menuIteam saving data");
      res.status(200).json(responce);
    } catch (err) {
      console.log("error saving postdata menuIteam", err);
      res.status(500).json({ error: "server error" });
    }
  });

  module.exports = router;