import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Button, message, List, Image, Popconfirm } from 'antd';
import { UploadOutlined, InboxOutlined, DeleteOutlined } from '@ant-design/icons';

const AddBanner = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await fetch('http://localhost:4000/allbanners');
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  useEffect(() => {
    fetchBanners(); // Fetch banners on component mount
  }, []);

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
    formData.append('banner', files[0]);

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
        fetchBanners(); // Refresh the list of banners
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/removebanner/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        message.success('Banner deleted successfully!');
        fetchBanners(); // Refresh the list of banners
      } else {
        message.error('Failed to delete banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      message.error('An error occurred while deleting the banner');
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
        loading={uploading}
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>

      <div style={{ marginTop: '40px' }}>
        <h2>Uploaded Banners</h2>
        <List
          dataSource={banners}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure you want to delete this banner?"
                  onConfirm={() => handleDelete(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={<Image width={100} src={item.url} />}
                title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default AddBanner;
