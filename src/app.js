const express = require('express');
const { adminAuth, userAuth } = require('./midleware/auth');

const app =  express();

app.use('/error', (req,res,next)=>{
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
});


app.listen(3000, ()=>{
  console.log("Server is successfully listing!");
});