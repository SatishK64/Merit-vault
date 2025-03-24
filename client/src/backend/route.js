import express from 'express';
import bcrypt from 'bcryptjs';
import connectDB from "./metaDB/db.js";		
import User from "./schema/users.js";
import { use } from 'react';

const router = express.Router();

connectDB();

router.post('/login',async(req,res)=>{

    const {username,password}=req.body;
    const user=await User.findOne({username});
    // console.log(username,password);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    if(user){
        const validPassword=await bcrypt.compare(password,user.passwordHash);
        if(validPassword){
            return res.status(200).json({role:user.role});
        }
        else{
            return res.status(401).json({message:"Invalid Password"});
        }
    }
});
router.put('/upload', async (req, res) => {
    
    const { username, file } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        console.log("User not found in database");
        return res.status(404).json({ message: "User not found" });
    }

    if (!file || !file.fileName || !file.previewImage||!file.title) {
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
        tags: file.tags || [],
        title:file.title
    });

    await user.save();
    res.status(200).json({ message: "User file details updated" });
    
});
// 🚀 **User Registration (POST)**
router.get('/alldata',async(req,res)=>{
    try{
        const users=await User.find({},{username:1,tags:1,_id:0});
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

router.get('/deets/:username',async (req,res)=>{
    console.log("One tag");
    const {username}=req.params;
    if(!username){
        return res.status(404).json({message:"username is empty"});
    }
    const user= await User.findOne({username});
    if(!user){
        return res.status(404).json({message:"User does not exist"})
    }
    return res.status(200).json({username:username,tags:user.tags})
})

router.get('/allfiles/:username',async (req,res)=>{
    try {
        const username = req.params.username;
        const user = await User.findOne({username});
        
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        return res.status(200).json({files: user.files});
    } catch (error) {
        console.error("Error fetching files:", error);
        return res.status(500).json({message: "Server error"});
    }
});
// 🚀 **File Upload (PUT)**
router.put('/upload', async (req, res) => {
    try {
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
            user.tags = file.tags;
        }

        user.files.push({
            fileName: file.fileName,
            previewImage: file.previewImage,
            tags: file.tags || ["misc"]
        });

        await user.save();
        res.status(200).json({ message: "User file details updated" });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error while updating the file details" });
    }
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
    console.log(username.files);
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    return res.status(200).json({files:user.files});
});
router.put('/deletefile', async (req, res) => {

    try {
        const { username, filename } = req.body;
        console.log(username,filename);
            const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const fileIndex = user.files.findIndex(file => file.fileName === filename);
        if (fileIndex === -1) {
            return res.status(404).json({ message: "File does not exist to delete in the first place" });
        }

        const fileTags = user.files[fileIndex].tags;

        user.files.splice(fileIndex, 1);

        const remainingTags = new Set(user.files.flatMap(file => file.tags));

        user.tags = user.tags.filter(tag => remainingTags.has(tag));

        await user.save();

        return res.status(200).json({ message: "File and unused tags deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
router.put('/resetpass',async(req,res)=>{
    const {username,newpassword}=req.body;
    const user=User;findONe({username});
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const newsalt=await bcrypt.genSalt(10);
    const newhash=await bcrypt.hash(newpassword,newsalt);
    user.passwordHash=newhash;
    await user.save();
    return res.status(200).json({message:"Password reset successfully"});
    

})


export default router;
