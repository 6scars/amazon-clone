const userData = (req,res)=>{
    res.json({user: req.userData})
}

const verifyToken = (req,res)=>{
       res.json({message:'token valid', user: req.userId});
}

module.exports = {
    userData,
    verifyToken
}


