const validator = require("validator");

const signupValidator = (req) => {
  const { firstName, lastName, email, password } = req.body;
  // console.log(req.body, firstName, lastName, email, password);
  if (!firstName) {
    throw new Error("First name is not valid!");
  }
  if (!lastName) {
    throw new Error("Last name is not valid!");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter valid strong password!");
  }
};


module.exports = {
  signupValidator
}
