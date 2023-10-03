const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) =>{
    // console.log(req.headers.authorization)
    const Authorization =  req.headers.authorization || req.headers.Authorization ||req.query.token || req.cookies.token||null;
    token = Authorization.split(' ')[1]
    // console.log(token)
    if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
     }
   jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    
    // If the token is valid, you can access the decoded data
    //  decoded; // This can be used in your routes to identify the user
    // console.log(decoded)
    req.user = decoded;
    next();
    
    // Proceed to the next middleware or route handler
  });

}