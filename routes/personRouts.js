const express = require("express");
const router = express.Router();
const person = require("../models/person");
const { jwtAuthMiddleware, genretToken } = require("../jwt");

router.get("/", jwtAuthMiddleware, async function (req, res) {
  try {
    const data = await person.find();
    console.log("success fatch data in person");
    res.status(200).json(data);
  } catch (error) {
    console.log("error saving person", error);
    res.status(500).json({ error: "server error in person" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = genretToken(payload);
    console.log("token is " + token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log("error saving person", err);
    res.status(500).json({ error: "server error in person" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ error: "Incomplete credentials username & password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = genretToken(payload);
    res.json({ message: "login sucessfully", token: token });
  } catch (error) {
    console.error("Error in person login", error);
    res.status(500).json({ error: "internal server error in person login" });
  }
});

// get perticular user data

router.get("/profile",jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;

    const user = await person.findById(userId);
    res.status(200).json({user});

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "internal server error for profile" });
  }
});

router.get("/:workType", async function (req, res) {
  try {
    let workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const persons = await person.find({ work: workType });
      console.log("success get menuIteam saving data");
      res.status(200).json(persons);
    } else {
      res.status(500).json({ Error: "Invalid Work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server Error" });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await person.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated document rather than the original one
      runValidators: true, // check all validation in schema
    });
    if (!result) {
      res.status(404).json({ error: "user Not found" });
    }
    console.log("data updated sucessFully");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await person.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ error: "user Not found" });
    }
    console.log("data delete sucessFully");
    res.status(200).json({ message: "Successfully deleted user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Server Error" });
  }
});

module.exports = router;
