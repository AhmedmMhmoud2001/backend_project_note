
module.exports =(...roles)=>{
    return (req,res,next)=>{
        // console.log(req.user.role);
        if(!roles.includes(req.user.role)){
           return res.status(401).json({ message: "you don't have authorized" });
        }
       
       next()
    }
}