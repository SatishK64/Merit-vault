import express from 'express';
import multer from 'multer';
import path from 'path';
import convertFirstPageToPng from './convert.js';
import connectDB from './metaDB/db.js';
import User from './schema/users.js';
import { Upload } from './ConfigDrive.js';
import { uploadUserFile } from './mongoose.js';

connectDB();
const router = express.Router();

const buffer = multer.memoryStorage();


// Set up multer with file size limits and allowed types
const uploadbuffer = multer({
  storage:buffer,
  limits:{
    fileSize: 25 * 1024 * 1024 //25MB limit
  },
  fileFilter(req, file, cb) {
    // Allow only PDF or image files
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF or image files are allowed!"), false);
    }
  }
});

// File upload endpoint
router.post('/:user', uploadbuffer.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // console.log('File uploaded:', req.file.originalname, title, req.file.size, req.file.mimetype);
  try {
    // Extract title and tags from the request body
    const title = req.body.title || '';
    const tags = req.body.tags ? req.body.tags.split(',') : [];
    
    // Check if the uploaded file is a PDF
    if (req.file.mimetype === 'application/pdf' || path.extname(req.file.originalname).toLowerCase() === '.pdf') {
      const uploadResponse = await Upload(req.file.buffer,req.file.mimetype,req.file.originalname);
      const fileId=uploadResponse.id;
      console.log('PDF file detected, converting first page to PNG...');
      // Convert the first page to PNG (this will store the PNG in the same directory)
      const pngResponse = await convertFirstPageToPng(req.file.buffer,req.file.originalname);
      const pngId=pngResponse.id;
      
      console.log(fileId, pngId, title, tags);
      
      try {
        // Update metadata in the database
        const response = await uploadUserFile(req.params.user, {
          fileName: fileId,
          previewImage: pngId,
          title: title,
          tags: tags
        });

        console.log('Metadata update response:', response.message);
        
        return res.status(200).json({ 
          message: 'File uploaded and converted successfully'
        });
      } catch (metaError) {
        console.error('Error updating metadata:', metaError.message);
        // If metadata update fails, should we delete the uploaded file?
        return res.status(500).json({ 
          error: 'Error updating metadata', 
          message: metaError.message 
        });
      }
    }else{

        
        // For non-PDF files
        console.log(req.file.originalname, title, tags, req.params.user);
        
        try {
            const uploadResponse = await Upload(req.file.buffer,req.file.mimetype,req.file.originalname);
            const fileId=uploadResponse.id;
            // Update metadata in the database
             const response = await uploadUserFile(req.params.user, 
                {
                    fileName: fileId,
                    previewImage: fileId,
                    title: title,
                    tags: tags
                }
            );
            
            console.log('Metadata update response:', response.message);
            
            return res.status(200).json({ 
                message: 'File uploaded successfully',
                file: {
                    name: req.file.originalname,
                    filename: fileId,
                    size: req.file.size,
                    mimetype: req.file.mimetype
                },
                metadata: {
                    title: title,
                    tags: tags
                }
            });
        } catch (metaError) {
            console.error('Error updating metadata:', metaError.message);
            return res.status(500).json({ 
                error: 'Error updating metadata', 
                message: metaError.message 
            });
        }
    }
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).json({ 
            error: 'Error processing file', 
            message: error.message 
        });
    }
}

);

export default router;