const express = require("express");
const { default: mongoose } = require("mongoose");
const connectToMongo = require("./db.js");
const app = express();
const User = require("./models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const JWT_Secret = "FirstNodeApplication";
const JWT = require('jsonwebtoken');
const blog_routes = require("./blog_route");
const cors = require('cors');
connectToMongo();

app.use(cors());
app.use(express.json());

 app.use('/blogs',blog_routes);

app.post(
  "/Registration",
  [
    body("name", "UserName Length Should Be greater Than 4").isLength({
      min: 5,
    }),
    body("password").isLength(8),
    body("email").isEmail(),
  ],
  async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    const errors = validationResult(req);
    let email_duplicate = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await User.find({ email: req.body.email });
      if (post.length > 0) {
        email_duplicate = true;
      }
    } catch (error) {
      res.status(409).json({ message: error.message });
    }

    try {
      if (!email_duplicate) {

        const salt = await bcrypt.genSalt(10);
        var secpass = await bcrypt.hash(req.body.password, salt);
        const user = new User({
          ...req.body,
          "password": secpass
        });

        await user.save();

        res.status(201).json(user);
      } else {
        res.status(201).json({
          errors: [
            {
              value: req.body.email,
              msg: "Email Already Exists",
              param: "Email",
              location: "body",
            },
          ],
        });
      }
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
);

app.post("/Login", [
  body("password").isLength(8),
  body("email").isEmail(),
], async function (req, res) {
 // console.log(req.body);
  const errors = validationResult(req);
  //console.log("Request come");
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Please Enter Valid Credentials" });
  }
  var email = req.body.email.trim();
  var password = req.body.password.trim();
  const user = await User.findOne({ email: email });
  if (user) {
    

    let password_compare = await bcrypt.compare(password, user.password);

    if (password_compare) {
      let jwt_data = JWT.sign({
        id: user._id
      }, JWT_Secret);
      return res.send({token:jwt_data});
    }
    else {
      return res.status(400).json({ error: "Please Enter Valid Credentials" });
    }

  }
  else {
    return res.status(400).json({ error: "Please Enter Valid Credentials" });
  }

});

app.post('/homeauthor', function (req, res, next) {
  try {
    var decoded = JWT.verify(req.body.id, JWT_Secret);
    res.send("ok");
  }
  catch (error) {
    res.send("first login");
  }

});
app.listen(8080);
