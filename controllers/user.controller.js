const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const signUp = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT)
    );
    const userObj = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ user_id: userObj._id }, process.env.JWT_SECRET);
    return res
      .status(201)
      .json({ status: 201, message: "User created successfully", data: token });
  } catch (error) {
    return res.status(500).json({ message: "Error while creating user" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "User doesn't exist" });
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
  } catch (error) {
    return res.status(500).json({ message: "Error while fetching user data" });
  }
};

const getUser = async (req, res) => {
  const userId = req.locals?.user_id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  try {
    let userObj = await User.findById({ _id: userId });
    let { fullName, email } = userObj;
    return res.status(201).json({
      status: 201,
      message: "user data fetched successfully",
      data: { fullName, email },
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error while getting the user info",
    });
  }
};

module.exports = { signUp, Login, getUser };
