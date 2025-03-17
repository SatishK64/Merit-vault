import express from 'express';
import bcrypt from 'bcryptjs';
import connectDB from "./metaDB/db.js";		
import User from "./schema/users.js";
import { use } from 'react';

const router = express.Router();

connectDB();

router.post('/login',async(req,res)=>{

    const {username,password}=req.body;
    // console.log(username,password);
    const user=await User.findOne({username});
    // console.log(username,password);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    if(user){
        const validPassword=await bcrypt.compare(password,user.passwordHash);
        if(validPassword){
            return res.status(200).json({message:"User authenticated"});
        }
        else{
            return res.status(401).json({message:"Invalid Password"});
        }
    }
});

// 🚀 **User Registration (POST)**
router.get('/alldata',async(req,res)=>{
    try{
        const users=await User.find({},{username:1,tags:1,_id:0});
        // console.log(users);
        res.status(200).json({data:users});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
})
router.post('/register', async (req, res) => {
    try {
        const { username, password, role = "student" } = req.body;
        const user = await User.findOne({ username });
       if(!username || !password){
            // console.log(username,password);
              return res.status(400).json({message:"Username and Password are required"});
       }
        if (user) {
            // console.log(user)
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, passwordHash: hashedPassword, role, files: [], tags: [] });
       
        await newUser.save();
        res.status(201).json({ message: "User Created" });
    } catch (err) {
        // console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 🚀 **File Upload (PUT)**
router.put('/upload', async (req, res) => {
    
        const { username, file } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            console.log("User not found in database");
            return res.status(404).json({ message: "User not found" });
        }

        if (!file || !file.fileName || !file.previewImage) {
            return res.status(400).json({ message: "File name or preview image not found" });
        }

        let fileExists = user.files.some(f => f.fileName === file.fileName);
        if (fileExists) {
            return res.status(409).json({ message: "File already exists" });
        }

        if (file.tags) {
            file.tags.forEach(tag => {
                if (!user.tags.includes(tag)) {
                    user.tags.push(tag);
                }
            });
        }

        user.files.push({
            fileName: file.fileName,
            previewImage: file.previewImage,
            tags: file.tags || []
        });

        await user.save();
        res.status(200).json({ message: "User file details updated" });
    
});

router.get('/tags', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        res.status(200).json({ tags: user.tags });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post('/allfiles',async (req,res)=>{
    const {username}=req.body;
    const user=await User.findOne({username});
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({files:user.files});
});
export default router;
