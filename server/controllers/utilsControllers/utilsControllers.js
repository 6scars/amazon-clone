
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Users = require('../../models/modelUser.js');

const takingUserData  = async(req, res, next) => {
    try {
        
        const userId = req.userId;
        const user = await Users.findById(userId).select('-password -createdAt -updatedAt -__v');
        if (!user) {
            return res.status(401).json({ message: 'Didn\'t find such user, please log in and try again' });
        }

        req.userData = user;
        next();
    } catch (error) {
        next(error);
    }
}



const authenticateToken = (req,res,next)=>{
    
    const authHeader = req.headers.authorization;
    
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'No header or not valid header Authorization' });
    }
    const usedToken = authHeader?.split(' ')[1];
;
    if(!usedToken)
        return res.status(401).json({message:'There is not token'});

    try{
        const decoded = jwt.verify(usedToken, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(e){
        return res.status(400).json({message:`You are not loged in, try log in to continue`});
    }

};


const roundMoney = (price) => {
    return Math.ceil(price*100)/100
}

module.exports = {
    takingUserData,
    authenticateToken,
    roundMoney
}