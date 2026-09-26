const jwt = require('jsonwebtoken');

const authArtist = async(req, res, next)=>{
  const token=req.cookies.token;

  if(!token) {
    return res.status(401).json({message: "Unauthorized Access"})
  }

  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    if(decoded.role !== "artist") {
      return res.status(403).json({message:"You don't have access"})
    }

    req.user=decoded;

    next()
  } catch(error) {
    console.log(error)
    return res.status(401).json({message: "Token Invalid or Expired"})
  }
}

const authUser=async(req,res,next)=>{
  
  const token=req.cookies.token;

  if(!token) {
    return res.status(401).json({message:"Unauthorized Access"})
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    next();
  } catch (error) {
    return res.status(401).json({message:"Invalid or Expired Token"})
  }
}

module.exports = {authArtist,authUser};