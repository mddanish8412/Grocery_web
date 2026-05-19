import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  try {

    const { sellerToken } = req.cookies;

    if (!sellerToken) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

    const decoded = jwt.verify(
      sellerToken,
      process.env.JWT_SECRET
    );

    if (decoded.email !== process.env.SELLER_EMAIL) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  }
};
export default authSeller;