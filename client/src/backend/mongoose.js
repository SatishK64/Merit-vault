import express from 'express';
import connectDB from './metaDB/db.js';
import User from './schema/users.js';


const router = express.Router();
connectDB();
export async function uploadUserFile( username, file ) {
    console.log(username,file)
    if (!username || !file) {
        throw { status: 400, message: "Username or file not provided" };
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    if (!file.fileName || !file.previewImage || !file.title) {
        throw { status: 400, message: "File name, preview image, or title not found" };
    }

    let fileExists = user.files.some(f => f.fileName === file.fileName);
    if (fileExists) {
        throw { status: 409, message: "File already exists" };
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
        title: file.title
    });

    await user.save();
    return { message: "User file details updated" };
}

router.put('/upload', async (req, res) => {
    try {
        const result = await uploadUserFile(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Internal server error" });
    }
});

export default router;