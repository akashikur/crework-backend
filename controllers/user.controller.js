const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../routes/User");
const signUp = async (req, res) => {
  const { email, password, fullname } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(411).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRIPT_SALT)
  );

  try {
    const userObj = await User.create({
      name: fullname,
      email,
      password: hashedPassword,
    });

    const user_id = userObj._id;

    const token = jwt.sign({ user_id }, process.env.JWT_SECRET);

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: token,
    });
  } catch (error) {
    return res.status(411).json({ message: "Error while creating user" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  let userData;
  try {
    userData = await User.findOne({ email });
    if (!userData) {
      return res.status(411).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while fetching user data",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ user_id: userData._id }, process.env.JWT_SECRET);

  return res.status(200).json({
    status: 200,
    message: "User logged in successfully",
    data: token,
  });
};

module.exports = { signUp, Login };
