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
// convert requst to json
app.use(express.json());

app.post("/signup", async (req, res, next) => {
  // console.log(req.body);
  const userData = new User(req.body);
  try {
    await userData.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("Getting some issue in saving! " + err.message);
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

app.get("/get-user-by-email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(404).send("User not found!");
    else res.send(user);
  } catch (err) {
    res.status(400).send("Something went worng! " + err.message);
  }
});

app.delete('/user', async (req, res)=>{
    try{
        // await User.findByIdAndDelete(req.body.id);
        await User.findByIdAndDelete({"_id":req.body.id});            
        res.send("User deleted successfully!");
    } catch (err) {
    res.status(400).send("Something went worng! " + err.message);
  }
})

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
