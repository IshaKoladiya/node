const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// const passport = require("./auth");

// app.get("/hello", function (req, res) {
//   res.send("Hello World from hello");
// });

// app.get("/world", function (req, res) {
//   const obj = {
//     name: "isha koladiya",
//     std: "mca",
//     collage: "dubai",
//     dreams: "lamber gini,mercidis,ktm,bunglows , lot of money , hardworking",
//   };
//   res.send(obj);
// });

//** person data

// app.get("/person", async function (req, res) {
//   try {
//     const data = await person.find();
//     console.log("success fatch data in person");
//     res.status(200).json(data);
//   } catch (error) {
//     console.log("error saving person", error);
//     res.status(500).json({ error: "server error in person" });
//   }
// });

// app.post("/person", async function (req, res) {
//   try {
//     const data = req.body;
//     const newPerson = new person(data);
//     const responce = await newPerson.save();
//     console.log("success saving data in person");
//     res.status(200).json(responce);
//   } catch (err) {
//     console.log("error saving person", err);
//     res.status(500).json({ error: "server error in person" });
//   }
// });

//** menu data
// app.get("/menuIteam", async function (req, res) {
//   try {
//     const data = await menu.find();
//     console.log("success menuIteam fatch data");
//     res.status(200).json(data);
//   } catch (error) {
//     console.log("error saving menuIteam", error);
//     res.status(500).json({ error: "server error" });
//   }
// });

// app.post("/menuIteam", async function (req, res) {
//   try {
//     const data = req.body;
//     const newPerson = new menu(data);
//     const responce = await newPerson.save();
//     console.log("success post menuIteam saving data");
//     res.status(200).json(responce);
//   } catch (err) {
//     console.log("error saving postdata menuIteam", err);
//     res.status(500).json({ error: "server error" });
//   }
// });

// Routing

// app.get("/person/:workType", async function (req, res) {
//   try {
//     let workType = req.params.workType;
//     if (workType == "chef" || workType == "waiter" || workType == "manager") {
//       const persons = await person.find({ work: workType });
//       console.log("success get menuIteam saving data");
//       res.status(200).json(persons);
//     } else {
//       res.status(500).json({ Error: "Invalid Work Type" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ Error: "Server Error"});
//   }
// });

const logRequest = ( req, res, next) => {
  console.log(
    `[{${new Date().toLocaleString()}] Request Mode to ${req.originalUrl}}`
  );
  next();
};

app.use(logRequest);


// passport.use(new LocalStrategy(async (userName, password, done) => {
  
//     try {
//       console.log(userName,password)
//       const user = await person.findOne({ username: userName });
//       if (!user) {
//         return done(null, false, { message: "invalid username" });
//       }
//       const isPasswordMatch = user.password === password ? true : false;
//       if (isPasswordMatch) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "incorrect password" });
//       }
//     } catch (error) {
//       return done(error);
//     }
//   })
// );
// app.use(passport.initialize())



//  passport - localStatagy

// personRouter
// const localAuthMiddlewear = passport.authenticate('local',{session:false})
const personRouts = require("./routes/personRouts");
app.use("/person", personRouts);

// menuRouts
const menuRouts = require("./routes/menuRouts");
app.use("/menuIteam", menuRouts);

app.listen(5000, () => {
  console.log("server port in 5000 stratted.....!");
});
