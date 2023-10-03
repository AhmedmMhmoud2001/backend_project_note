const User = require('../model/user.model')
const bcrypt = require('bcryptjs');
const generateJWT=require('../Utils/generate.jwt')
// const  jwt = require('jsonwebtoken');
exports.ALLuser = async (req,res) =>{
    try{
        console.log(req.headers)
        const users = await User.find();
        res.send(users)

    }
    catch(err){
        res.status(404).json({ err: err.message });
    }
}
exports.register = async (req,res) =>{
    // console.log(process.env.SECRET_KEY)
    try{
        
        const {firstName,lastName,email,password,role} = req.body
        const oldUser =await User.findOne({email})
        if (oldUser) {
            return res.status(400).json({ message: 'email already exists' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash)
        const newUser =new User(
            {
                firstName,
                lastName,
                email,
                password:passwordHash,
                role

            }
        )
        // const token = await jwt.sign({id:newUser._id,email:newUser.email},process.env.SECRET_KEY, { expiresIn: '30' });
        // console.log(token)
        const token = await generateJWT.token({id:newUser._id,email:newUser.email,role:newUser.role});
        newUser.token= token;

        await newUser.save();
        res.status(201).json({ message: 'Registration successful' , newUser:newUser });
    }
    catch(err){
        
            res.status(404).json({ err: err.message });
    }
}
exports.Logen = async(req,res) =>{
    try{
       const {email,password}=req.body
       if(!email||!password){
        return res.status(400).json({ message: 'Enter email and password' })
       }
       const user = await User.findOne({email})
       if(!user){
        return res.status(400).json({ message: 'this email not found' })
       }
    //    console.log(user.password)
    //    console.log(password)

      const matchedPassword= await bcrypt.compare(password,user.password);
    //   console.log(matchedPassword)
      const token = await generateJWT.token({id:user._id,email:user.email,role:user.role});

      if (matchedPassword) {
        return res.status(200).json({token});
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    }
    catch(err){
          res.status(404).json({ err: err.message });
    }
}

