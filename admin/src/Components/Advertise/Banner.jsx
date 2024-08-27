import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const AddBanner = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleSubmit = async () => {
    if (files.length === 0) {
      message.warning('Please upload an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('banner', files[0]); // Append the file for banner

    setUploading(true);

    try {
      const response = await fetch('http://localhost:4000/bannerupload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success === 1) {
        message.success('Image uploaded successfully!');
        setFiles([]); // Clear the file after successful upload
      } else {
        message.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('An error occurred during image upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '10px', textAlign: 'center' }}>
      <div {...getRootProps()} style={{ border: '2px dashed #d9d9d9', padding: '20px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
        <p style={{ marginTop: '10px', color: '#595959' }}>Drag & drop banner images here, or click to select files</p>
        {files.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <img src={files[0].preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }} />
          </div>
        )}
      </div>
      <Button
        type="primary"
        onClick={handleSubmit}
        icon={<UploadOutlined />}
        loading={uploading} // Show loading spinner when uploading
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddBanner;
