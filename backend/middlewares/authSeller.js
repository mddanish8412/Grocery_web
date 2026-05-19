import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  try {

    const { sellerToken } = req.cookies;

    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Seller",
      });
    }

    const decoded = jwt.verify(
      sellerToken,
      process.env.JWT_SECRET
    );

    req.seller = decoded.email;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Seller Token",
    });

  }
};

export default authSeller;