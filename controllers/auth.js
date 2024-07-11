const User = require("../model/userModel");
const  fixerror = require('../utils/fixerror')
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
   const errors  = fixerror(error)
   res.status(400).json(errors);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Necessary information required" });
  }

  
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      // return res.status(400).json({ success: false, message: "Email does not exist" });
   throw Error('incorrect email')
    }
    //incorrect password
    const isAuthenticated = await userExist.comparePassword(password);
    if (!isAuthenticated) {
      // return res.status(400).json({ success: false, message: "Email or password is incorrect" });
    throw Error('incorrect password')
    }
    //generate token
    const token = userExist.generateToken();
    res.status(200).json({
      success: true,
      user: { name: userExist.name, email: userExist.email },
      token,
    });
  } catch (error) {
const errors = fixerror(error);
res.status(400).json(errors);
    // res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { register, login };
