import express from 'express';
import drive from './ConfigDrive.js';


const router = express.Router();
router.get("/",(req,res)=>{
    res.json({message : "hello from fileHandle.js"});
});

router.get("/download/:fileId",async (req,res)=>{
    const {fileId} = req.params;
    try{
    // Step 1: Get file metadata
    const metadata = await drive.files.get({
      fileId,
      fields: "name, mimeType"
    });

    const { name, mimeType } = metadata.data;

    // Step 2: Set headers for download
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    res.setHeader("Content-Type", mimeType);

    // Step 3: Stream the file content
    const fileStream = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    fileStream.data.pipe(res);
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).json({ error: 'Failed to download file' });
  }
});
router.get('/view/:fileId',async (req, res) => {
    const {fileId} = req.params;
    console.log(fileId)
    try {
    const response = await drive.files.get(
      { fileId:fileId, alt: 'media' }, // fetch the file content
      { responseType: 'stream' }
    );

    res.setHeader('Content-Type', 'image/png');
    response.data.pipe(res); // stream directly to frontend
  } catch (err) {
    console.error('Error fetching PNG:', err);
    res.status(500).json({ error: 'Failed to fetch PNG preview' });
  }
});


export default router;
