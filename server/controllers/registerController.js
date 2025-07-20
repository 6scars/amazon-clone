const bcrypt = require('bcrypt');
const Users = require('../models/modelUser.js');


const registerUser = async(req,res)=>{
    const Rusername = req.body.Rusername;
    const Rpassword = await bcrypt.hash(req.body.Rpassword,10);
    const Remail= req.body.Remail;

    const user = new Users({
        username: Rusername,
        password: Rpassword,
        email: Remail,
    });
    await user.save();
    return res.status(200).json({message:'registering...'})
}

module.exports = {
    registerUser
}