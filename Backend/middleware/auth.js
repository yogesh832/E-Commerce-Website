import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extracts token after 'Bearer '
  if (!token) {
    return res.json({ success: false, message: "No token found" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
