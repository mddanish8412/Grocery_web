import jwt from "jsonwebtoken";

// seller login
export const sellerLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {

      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.cookie("sellerToken", token, {
     
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
     

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });

    } else {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};

// seller logout
export const sellerLogout = async (req, res) => {
  try {

    res.clearCookie("sellerToken", {
        httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};

// check seller auth
export const isAuthSeller = async (req, res) => {
  try {

    res.status(200).json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};