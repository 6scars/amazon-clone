const bcrypt = require('bcrypt');
const Users = require('../models/modelUser.js');


const registerUser = async(req,res,next)=>{
    try{
        const RpasswordBcrypt = await bcrypt.hash(req.body.Rpassword,10);
        const user = new Users({
            username: req.body.RuserName,
            password: RpasswordBcrypt,
            email: req.body.Remail,
        });
        await user.save();
        res.status(200).json({message:'Registered succesfully, wait for be redirected to the page...', redirect:'amazon.html'})
        req.user = {
            _id: user._id
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message:'server error, try again later'})
    }

}

//userName dont repeat, rpassword the same length size numbers, email have @

const validation = async (req,res,next)=>{
    try{
    const RuserName = req.body.RuserName;
    const Rpassword = req.body.Rpassword;
    const Rpassword2 = req.body.Rpassword2;
    const Remail= req.body.Remail;

    const userNameFounded = await Users.findOne({username: RuserName});
    if(userNameFounded){
        return res.status(400).json({message:'User already exsist'})
    }
    if(Rpassword !== Rpassword2){
       return res.status(400).json({message:'Passwords are not the same'})
    }
    const specialChars = `!@#$%^&*()_+-=[]{};:'",.<>/?\\|~\``;
    const containChar = specialChars.split("").some(char => Rpassword.includes(char));
    if(!containChar){
        return res.status(400).json({message:'Password doesn\'t contain special char'});
    }
    if(Rpassword.length < 8){
       return res.status(400).json({message:'Password is too short'});
    }
    if(!(/[A-Z]/.test(Rpassword))){
        return res.status(400).json({message:'Password must contain at least one upper letter'})
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const testEmail = re.test(Remail);

    if(!testEmail){
       return res.status(400).json({message:'Email is not valid'});
    }
    const emailFinded = await Users.findOne({email: Remail});
    if(emailFinded){
       return res.status(400).json({message: 'Emails already exist'})
    }


    next();
    }catch(err){
       return res.status(500).json({message:'server error, try again later'})
    }
    
}




module.exports = {
    registerUser,
    validation
}