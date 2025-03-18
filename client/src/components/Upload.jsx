// Frontend React Component (FileUpload.js)
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({click,link, username}) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus('');
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !tags) {
      setStatus('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('tags', tags);

    setUploading(true);
    setStatus('Uploading...');

    try {
      console.log(username);
      const response = await axios.post(`${link}upload/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      console.log(response);

      setStatus(`Upload successful: ${response.data.message}`);
      setFile(null);
      setTitle('');
      setTags('');
    } catch (error) {
      setStatus(`Upload failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
    <button onClick={click}>Close</button>
      <h2>File Upload</h2>
      <div className="file-input">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      <div className="text-input">
        <input
          type="text"
          placeholder="Enter document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={uploading}
        />
      </div>
      <div className="text-input">
        <input
          type="text"
          placeholder="Enter tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={uploading}
        />
      </div>
      <button onClick={handleUpload} disabled={!file || uploading}>
        Upload File
      </button>
      {uploading && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <span>{progress}%</span>
        </div>
      )}
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default FileUpload;