import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Invalid details" });
  }
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //Sending email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "EngiNeed Account Creation",
      text: `Welcome to EngiNeed. Your account has been created with email: ${email}`,
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #fefcbf; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ecc94b; border-radius: 8px; overflow: hidden;">
        
        <div style="padding: 20px; text-align: center; background: linear-gradient(90deg, #f6e05e, #ecc94b);">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/VCSMS_logo_v2.png/200px-VCSMS_logo_v2.png" alt="VCSMS Logo" style="max-width: 130px;" />
          <h1 style="color: #4e1313; margin-top: 10px;">Welcome to EngiNeed!</h1>
        </div>
        
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #4e1313;">
            Hello <strong>${name}</strong>,
          </p>
          <p style="font-size: 15px; color: #611919;">
            Thank you for registering at <strong>EngiNeed</strong>. We're excited to have you on board!
          </p>
          <p style="color: #b7791f; font-weight: bold;">
            Your registered email: <span style="color: #2b6cb0;">${email}</span>
          </p>
          
          <p style="font-size: 14px; color: #4e1313; margin-top: 20px;">
            This email is automatically generated, do not reply to this email.
          </p>
        </div>

        <div style="background-color: #ecc94b; padding: 10px; text-align: center;">
          <p style="color: #4e1313; font-size: 13px; margin: 0;">© 2025 EngiNeed. All rights reserved.</p>
        </div>
        
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured",
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: "Email and Password are invalid",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Succesfully logged out" });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured, please refresh the page",
    });
  }
};

//Send Verification OTP to user email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account is already verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "EngiNeed: Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fefcbf; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ecc94b; border-radius: 8px; overflow: hidden;">
            
            <div style="padding: 20px; text-align: center; background: linear-gradient(90deg, #f6e05e, #ecc94b);">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/VCSMS_logo_v2.png/200px-VCSMS_logo_v2.png" alt="EngiNeed Logo" style="max-width: 130px;" />
              <h1 style="color: #4e1313; margin-top: 10px;">Welcome to EngiNeed!</h1>
            </div>
            
            <div style="padding: 20px;">
              <p style="font-size: 16px; color: #4e1313;">
                Hello <strong>${user.name}</strong>,
              </p>
              <p style="font-size: 15px; color: #611919;">
                Thank you for registering at <strong>EngiNeed</strong>. We're excited to have you on board!
              </p>
              <p style="color: #b7791f; font-weight: bold;">
                Your registered email: <span style="color: #2b6cb0;">${user.email}</span>
              </p>
              <p style="font-size: 16px; color: #4e1313;">
                Your OTP is: <strong style="font-size: 24px;">${otp}</strong>
              </p>
              <p style="font-size: 14px; color: #4e1313; margin-top: 20px;">
                If you have any questions or need help, feel free to reply to this email.
              </p>
            </div>

            <div style="background-color: #ecc94b; padding: 10px; text-align: center;">
              <p style="color: #4e1313; font-size: 13px; margin: 0;">© 2025 EngiNeed. All rights reserved.</p>
            </div>
            
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent to email" });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error has occurred",
    });
  }
};

//verifying email using otp
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Invalid OTP" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.json({
        success: false,
        message: "New password cannot be the same as the old passwordd",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error has occurred",
      error: error.message,
    });
  }
};

//Checks to see if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Send password reset otp
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "EngiNeed: Account Verification OTP",
      text: `Your OTP is ${otp}. Reset your account using this OTP`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fefcbf; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ecc94b; border-radius: 8px; overflow: hidden;">
            
            <div style="padding: 20px; text-align: center; background: linear-gradient(90deg, #f6e05e, #ecc94b);">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/VCSMS_logo_v2.png/200px-VCSMS_logo_v2.png" alt="EngiNeed Logo" style="max-width: 130px;" />
              <h1 style="color: #4e1313; margin-top: 10px;">Welcome to EngiNeed!</h1>
            </div>
            
            <div style="padding: 20px;">
              <p style="font-size: 16px; color: #4e1313;">
                Hello <strong>${user.name}</strong>,
              </p>
              <p style="color: #b7791f; font-weight: bold;">
                Your registered email: <span style="color: #2b6cb0;">${user.email}</span>
              </p>
              <p style="font-size: 16px; color: #4e1313;">
                Your OTP for resetting your password is: <strong style="font-size: 24px;">${otp}</strong>
              </p>
              <p style="font-size: 14px; color: #4e1313; margin-top: 20px;">
                If you have any questions or need help, feel free to reply to this email.
              </p>
            </div>

            <div style="background-color: #ecc94b; padding: 10px; text-align: center;">
              <p style="color: #4e1313; font-size: 13px; margin: 0;">© 2025 EngiNeed. All rights reserved.</p>
            </div>
            
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Reset OTP sent to email" });
  } catch (error) {
    return res.json({ success: false, message: "An error has occured" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP, please try again",
      });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP is expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    res.json({ success: true, message: "Password has been reset succesfully" });
  } catch (error) {
    return res.json({ success: false, message: "An error has occured" });
  }
};
