const express = require("express");
// const { adminAuth, userAuth } = require("./midleware/auth");
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user.js");

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
  const userData = new User({
    firstName: "Raj",
    lastName: "Kamal",
    email: "raj@gmail.com",
    password: "raj@welocme123",
    age: 32,
    gender: "Male",
  });

  try {
    await userData.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("Getting some issue in saving! " + err.message);
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
