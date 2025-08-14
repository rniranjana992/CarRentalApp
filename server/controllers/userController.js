import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import Car from "../models/Car.js";

// JWT token generation
const generateToken = (userId) =>{
  const payload=userId;
  return jwt.sign(payload,process.env.JWT_SECRET)

}


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: 'Fill all the fields' })
    }
    const userExists=await User.findOne({email})

    if (userExists) {
      return res.json({ success: false, message: 'User already exists' })
    }

    const hashedPassword= await bcrypt.hash(password,10)

    const user = await User.create({ name, email, password: hashedPassword })
    const token = generateToken(user._id.toString())
    res.json({ success: true, token })

  } catch (error) {
    console.log(error.message);
      return res.json({ success: false, message: 'error.message' })
    }
}
//userlogin

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // ✅ Proper bcrypt.compare usage (plaintext first, hash second) :contentReference[oaicite:2]{index=2}
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid Credentials' })
    }

    const token = generateToken(user._id.toString())
    res.json({ success: true, token })

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: 'Server error' })
  }
}
//get user data using jwt token
export const getUserData=async(req,res)=>{
  try{
    const{user} =req;
    res.json({success: true,user})

  }
  catch(error){
    console.log(error.message);
    res.json({success: false,message: error.message})

  }
}

//get all cars for the frontend
export const getCars=async(req,res)=>{
  try{
    const cars=await Car.find({isAvailable: true})
    res.json({success: true,cars})

  }
  catch(error){
    console.log(error.message);
    res.json({success: false,message: error.message})

  }
}