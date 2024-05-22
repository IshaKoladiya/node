const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    const auth = req.headers.authorization

    if(!auth) return res.status(401).json({ error: "missing token" });

    const token = req.headers.authorization.split(" ")[1]; 

  if (!token) return res.status(401).json({ error: "No Authorize" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({error : "not authorize token"})
  }
};

const genretToken =(tokenData)=>{
    return jwt.sign({tokenData} ,process.env.JWT_SECRET,{expiresIn : 30000})
}

module.exports = {jwtAuthMiddleware ,genretToken };
