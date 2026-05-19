import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {

  try {

    console.log(req.cookies);

    const sellerToken = req.cookies.sellerToken;

    if (!sellerToken) {

      return res.status(401).json({
        success: false,
        message: "No Seller Token",
      });

    }

    const decoded = jwt.verify(
      sellerToken,
      process.env.JWT_SECRET
    );

    console.log(decoded);

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  }

};

