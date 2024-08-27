import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Button, message, Card, Row, Col } from 'antd';
import { UploadOutlined, InboxOutlined, DeleteOutlined } from '@ant-design/icons';

const AddBanner = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
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

  const handleRemove = (fileToRemove) => {
    setFiles(prevFiles => prevFiles.filter(file => file.preview !== fileToRemove.preview));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '10px', textAlign: 'center' }}>
      <div {...getRootProps()} style={{ border: '2px dashed #d9d9d9', padding: '20px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
        <p style={{ marginTop: '10px', color: '#595959' }}>Drag & drop banner images here, or click to select files</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {files.slice(0, 4).map((file, index) => (
          <Col span={12} key={index}>
            <Card
              cover={<img src={file.preview} alt="Preview" style={{ maxHeight: '150px', objectFit: 'cover' }} />}
              actions={[<DeleteOutlined key="delete" onClick={() => handleRemove(file)} />]}
            />
          </Col>
        ))}
      </Row>

      <Button
        type="primary"
        onClick={handleSubmit}
        icon={<UploadOutlined />}
        loading={uploading} // Show loading spinner when uploading
        style={{ marginTop: '20px' }}
        disabled={files.length === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddBanner;
