const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")
const BlackList=require("../models/balcklist.model")

const SIGNUP = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hashedPassword = await argon2.hash(password);
        user = await User.create({ username, email, password: hashedPassword },{password:0});
        const token = jwt.sign({ email, username, _id: user._id ,role:user.role}, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(500).send({message:err.message});
    }
}


const LOGIN = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({message:'Invalid credentials'});
        }
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).send({message:'Invalid credentials'});
        }
        const { username, _id, role } = user
        const token = jwt.sign({ email, username, _id, role }, process.env.JWT_SECRET);
        const newuser={email,username,_id,role}
        res.status(201).send({ user:newuser, token });
    } catch (err) {
        console.error(err);
        res.status(500).send({message:err.message});
    }
}

const LOGOUT=async(req,res)=>{
    try {
        const token = req.headers.authorization;
        await BlackList.create({token})
        res.status(201).send({message:"logout successfull"})
    } catch (error) {
        console.error(err);
        res.status(500).send({message:err.message});
    }
}

module.exports = { SIGNUP, LOGIN ,LOGOUT}