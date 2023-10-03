const jwt = require('jsonwebtoken');

exports.token = async(payload)=>{
    const token = await jwt.sign(payload,process.env.SECRET_KEY, { expiresIn: '30m' });
    return token;
}