// Frontend React Component (FileUpload.js)
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Upload.module.css';

const FileUpload = ({click,link, username}) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus('');
      const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('No file chosen');
    }
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

      setStatus(`${response.data.message}`);
      setFile(null);
      setTitle('');
      setTags('');
      setFileName('No file chosen');
    } catch (error) {
      setStatus(`Upload failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
    <div className={styles.modal}>
      <div onClick={click} className={styles.closecontainer}>
          <div className={styles.leftright}></div>
          <div className={styles.rightleft}></div>
          <label className={styles.close}>close</label>
      </div>
      <div className={styles.content}>

        <h1 className={styles.text}>File Upload</h1>
        <div className={styles.fileInputContainer}>
          <span className={styles.fileName}>{fileName}</span>
          <label htmlFor="fileUpload" className={styles.customFileUpload}>
            Choose File
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>
            Enter document title:
          </label>
          <input
            type="text"
            placeholder="Project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={uploading}
            className={styles.input}
            />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.inputLabel}>
            Enter tags:
          </label>
          <input
            type="text"
            placeholder="AI, Resume, etc."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={uploading}
            className={styles.input}
            />
        </div>
        <button onClick={handleUpload} className={`${styles.btn} ${styles["btn-down"]} ${styles["btn-down--black"]}`} disabled={!file || uploading}>
          Upload File
        </button>
        {uploading && (
          <div 
          className={styles.progress} 
          style={{ "--progress": `${progress}%` }}
        />
        )}
        {status && <p className={styles.uptext}>{status}</p>}
      </ div>
      </div>
    </div>
  );
};

export default FileUpload;