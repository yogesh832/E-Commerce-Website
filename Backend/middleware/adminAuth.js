import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//     console.log('calling admin auth')
//     const adminAuth = async (req, res, next) => {
//         try {
//             const authHeader = req.headers.authorization;
    
//             // Check if the token exists
//             if (!authHeader || !authHeader.startsWith("Bearer ")) {
//                 return res.status(401).json({ success: false, message: "No token provided" });
//             }
//             if (!process.env.JWT_SECRET) {
//                 throw new Error("JWT_SECRET is not defined");
//             }
            
    
//             const token = authHeader.split(" ")[1];
    
//             // Verify the token with the secret key
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//             // Check if the decoded token contains the admin email
//             if (!process.env.ADMIN_EMAIL || decoded.email !== process.env.ADMIN_EMAIL) {
//                 return res.status(403).json({ success: false, message: "Not authorized" });
//             }
    
//             next();
//         } catch (error) {
//             console.error("Error in adminAuth middleware:", error.message);
//             return res.status(401).json({ success: false, message: error.message || "Token verification failed" });
//         }
//     };
    
// };

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if the token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        

        const token = authHeader.split(" ")[1];

        // Verify the token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("checking authorization", process.env.ADMIN_EMAIL, decoded.email, token, decoded)
        // Check if the decoded token contains the admin email
        if (!process.env.ADMIN_EMAIL || decoded.id !== process.env.ADMIN_EMAIL) {
           
            return res.status(403).json({ success: false, message: "Not authorized" });
        }
         console.log('before next')
        next();
        console.log('after next')
    } catch (error) {
        console.error("Error in adminAuth middleware:", error.message);
        return res.status(401).json({ success: false, message: error.message || "Token verification failed" });
    }
};

export default adminAuth;
