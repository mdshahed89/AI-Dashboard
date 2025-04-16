import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import emailSender from "../utils/emailSender.js";

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({
      success: false,
      message: "Provide required fields to make an account",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        success: false,
        message: "User already exist, please login",
      });
    }
    const newAdmin = new User({
      name,
      email,
      password,
    });
    const savedAdmin = await newAdmin.save();

    if (!savedAdmin) {
      return res.status(400).send({
        success: false,
        message: "Failed to create admin, please try again",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(`Error in create admin controller: ${error}`);
    return res.status(500).send({
      success: false,
      message: "Server error, please try again",
    });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Vennligst fyll ut de nødvendige feltene for å opprette en konto.",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Ugyldig e-post, vennligst prøv med en korrekt e-postadresse.",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Beklager, passordet du oppga er feil. Vennligst sjekk og prøv igjen." });
    }

    const token = jwt.sign(
      { id: user?._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).send({
      success: true,
      message: "Admin login successfully",
      token,
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(`Error in create admin controller: ${error}`);
    return res.status(500).send({
      success: false,
      message: "Server error, please try again",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exist in our system",
      });
    }
    const token = jwt.sign(
      { id: user._id, email, userType: user?.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Tilbakestill passordet ditt",
      html: `
        <p>Vi har mottatt en forespørsel om å tilbakestille passordet ditt.</p>
        <p>Klikk på linken nedenfor for å sette passordet ditt sikkert.</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Denne linken vil utløpe om 1 time.</p>
        <p>Hvis du ikke har bedt om å tilbakestille passordet, kan du se bort fra denne e-posten.</p>
      `,
    };
    await emailSender(mailOptions);

    return res.status(200).send({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(`Error in forgot password controller: ${error}`);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;
    if (!token || !password || !confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Password and confirmpassword should be match",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid token: Email not found." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    user.password = password;
    const savedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset successfully",
      data: savedUser,
    });
  } catch (error) {
    console.log(`Server error in reset password controller: ${error}`);
    res.status(500).send({
      success: false,
      message: `Server error during reset password: ${error.message}`,
    });
  }
};

export const changeEmail = async (req, res) => {
  const { email } = req.user;
  const { oldEmail, newEmail, confirmEmail, password } = req.body;

  if (!oldEmail || !newEmail || !confirmEmail || !password) {
    return res.status(400).send({
      success: false,
      message: "All fields are required",
    });
  }
  if (!email || email !== oldEmail) {
    return res.status(400).send({
      success: false,
      message: "You are not authenticated",
    });
  }

  if (newEmail !== confirmEmail) {
    return res.status(400).send({
      success: false,
      message: "new email and confirm email should be match",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Your account is not found",
      });
    }

    const existAccount = await User.findOne({ email: newEmail });
    if (existAccount) {
      return res.status(400).send({
        success: false,
        message: "The new email is already in use.",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Failed to change email, please try again",
        });
    }

    const token = jwt.sign(
      { id: user?._id, email: newEmail },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // console.log(newEmail, updatedUser.email);

    return res.status(200).send({
      success: true,
      message: "Email changed successfully",
      token: token,
      data: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser?.name,
      },
    });
  } catch (error) {
    console.error("Error change password controller:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during change password.",
    });
  }
};

export const changePassword = async (req, res) => {
  const { email } = req.user;
  const { password, newPassword, confirmPassword } = req.body;

  if (!email) {
    return res.status(400).send({
      success: false,
      message: "You are not authenticated",
    });
  }

  if (!password || !newPassword || !confirmPassword) {
    return res.status(400).send({
      success: false,
      message: "All fields are required",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).send({
      success: false,
      message: "New passwords do not match",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Your account is not found",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid password" });
    }
    user.password = newPassword;

    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error change password controller:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during change password.",
    });
  }
};
