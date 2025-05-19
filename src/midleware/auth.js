const adminAuth = (req,res, next) =>{
  const token = 'xyzw';
  const authtoken =  (token ==='xyz') ? true : false;
  if(!authtoken){
    res.status(401).send('Admin Not Authroised!');
  }else{
    next();
  }
}
const userAuth = (req,res, next) =>{
  const token = 'xyz1';
  const authtoken =  (token ==='xyz') ? true : false;
  if(!authtoken){
    res.status(401).send('User Not Authroised!');
  }else{
    next();
  }
}




module.exports = {
  adminAuth,
  userAuth
}