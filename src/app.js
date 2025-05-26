const express = require("express");
// const { adminAuth, userAuth } = require("./midleware/auth");

const app = express();

const connectDB = require("./config/database");
const User = require("./models/user.js");
const { signupValidator } = require("./utils/validator.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); // convert requst to json
app.use(cookieParser()); // Parse to cookies;

connectDB()
  .then(() => {
    console.log("Database connected!");
    app.listen("3000", () => {
      console.log("server listing successfull!");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!");
  });

app.post("/signup", async (req, res, next) => {
  // console.log(req.body);
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHash;
    signupValidator(req);
    const userData = new User(req.body);
    await userData.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("Getting some issue in saving! " + err.message);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      throw new Error("Invalid Credentials!!");
    }

    const validPassword = bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign({ _id: user._id }, "Rkm@123#");
      console.log(token);
      res.cookie("token", token);
      res.send("Login Successfull!");
    } else {
      throw new Error("Invalid Credentials!!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went worng! " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  console.log('Profile APi');
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token!");
    }
    const decodedToken = await jwt.verify(token, "Rkm@123#");

    const { _id } = decodedToken;
    console.log("Loging User Id:" + _id);

    const user = await User.findById(_id).select("-password");
    if (!user) {
      throw new Error("User not find! Please login again");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error! " + err.message);
  }
});

app.get("/get-user-by-email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(404).send("User not found!");
    else res.send(user);
  } catch (err) {
    res.status(400).send("Something went worng! " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    // await User.findByIdAndDelete(req.body.id);
    await User.findByIdAndDelete({ _id: req.body.id });
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went worng! " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;
    const beforeUpdatingData = await User.findOneAndUpdate(
      { _id: userId },
      data,
      { returnDocument: "before", runValidators: true }
    );
    console.log(beforeUpdatingData);
    res.send("User updated successfully!");
  } catch (err) {
    res.status(400).send("Something went worng! " + err.message);
  }
});

/* app.use('/error', (req,res,next)=>{
    throw new Error('dkdkdkdkd');
});


app.use('/', (err, req, res, next)=>{
  if(err){
    res.status(501).send('Somthing worng!');
  }
});

app.use('/admin', adminAuth)
app.use('/admin/getData', (req, res, next)=>{
  res.send('showAll Data');
});



// app.use('/' (req, res,next) => routeone,[route2, route3], route4, route5) OR 
// app.use('/' (req, res,next) => [routeone,route2, route3, route4, route5])
app.use('/user', userAuth, (req, res, next) => {
  console.log('First route response calling...');
  // res.send('First User Response!');
  next();
},(req, res, next) => {
  console.log('Second route response calling...');
  // res.send('Second User Response!');
  next();
},(req, res, next) => {
  console.log('Third route response calling...');
  // res.send('Third User Response!');
  next();
},(req, res, next) => {
  console.log('Fourth route response calling...');
  // res.send('Fourth User Response!');
  next();
},(req, res, next) => {
  console.log('Fifth route response calling...');
  res.send('Fifth User Response!');
});


// app.use('/', (req, res) => {
//   res.send('Hello from Dashboard!');
// });
app.use('/server', (req, res) => {
  res.send('Hello from server!');
}); */

/* 
app.listen(3000, ()=>{
  console.log("Server is successfully listing!");
}); */
