import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const isAdmin = email === process.env.ADMIN_EMAIL;

    const newUser = new User({
      username,
      email,
      password: hash,
      role: isAdmin ? "admin" : "user",
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed, try again later" });
  }
};

// export const login = async (req, res) => {
//   const email = req.body.email;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User Not Found" });
//     }

//     const isValidPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!isValidPassword) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid Password or Email" });
//     }

//     const { password, role, ...rest } = user.toObject();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "15d" }
//     );

//     // Send the token in the response body instead of setting a cookie
//     res.status(200).json({
//       success: true,
//       message: "Successfully Logged In",
//       token, // Include the token in the response
//       data: { ...rest },
//       role,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to Login" });
//   }
// };

export const login = async (req, res) => {
  const email = req.body.email;
  console.log("Login attempt for email:", email); // Log the email being used

  try {
    const user = await User.findOne({ email });
    console.log("Found user:", user); // Log the user found

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ success: false, message: "User Not Found" });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    console.log("Password valid:", isValidPassword); // Log password validity

    if (!isValidPassword) {
      console.log("Invalid password");
      return res.status(401).json({ success: false, message: "Invalid Password or Email" });
    }

    const { password, role, ...rest } = user.toObject();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    console.log("Token generated:", token); // Log the generated token

    res.status(200).json({
      success: true,
      message: "Successfully Logged In",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Login" });
  }
};
