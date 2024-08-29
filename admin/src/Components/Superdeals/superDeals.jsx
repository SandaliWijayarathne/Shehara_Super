import React, { useEffect, useState } from 'react';
import { Layout, Menu, Input, Table, Button, Form, InputNumber, Slider, Modal, message } from 'antd';
import axios from 'axios';

const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const AdminPanel = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/allproducts');
      setAllProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Search products by name
  const onSearch = (value) => {
    if (value) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  // Handle product selection with confirmation
  const handleProductSelect = (record) => {
    confirm({
      title: 'Are you sure you want to select this product?',
      content: `${record.name} - Rs. ${record.price}`,
      onOk() {
        setSelectedProduct(record);
      },
      onCancel() {
        console.log('Selection canceled');
      },
    });
  };

  // Handle "All Products" menu item click
  const handleAllProductsClick = () => {
    setFilteredProducts(allProducts);
  };

  // Add product to Super Deals
  const addToSuperDeals = async (id,discount) => {
    if (selectedProduct) {
      try {
        const response = await axios.put(`http://localhost:4000/updatediscount:${id}`, {
          discount
        });

        if (response.data.success) {
          message.success('Product added to Super Deals successfully!');
          // Optionally update the product list with the new discount value
          fetchAllProducts();
        } else {
          message.error('Failed to add product to Super Deals');
        }
      } catch (error) {
        console.error('Error updating discount:', error);
        message.error('Failed to update discount');
      }
    }
  };

  // Columns for the product table
  const columns = [
    {
      title: 'Product',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <img src={record.image} alt={record.name} style={{ width: 50 }} />
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `Rs. ${text}`
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleProductSelect(record)}>
          Select
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key="1" onClick={handleAllProductsClick}>
            All Products
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#fff' }}>
          <Search placeholder="Search products" onSearch={onSearch} enterButton />
        </Header>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          <Table
            columns={columns}
            dataSource={filteredProducts}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
          {selectedProduct && (
            <div style={{ marginTop: 20 }}>
              <h2>Add to Super Deals</h2>
              <Form layout="vertical">
                <Form.Item label="Product Title">
                  <Input value={selectedProduct.name} disabled />
                </Form.Item>
                <Form.Item label="Discount Percentage">
                  <Slider
                    min={0}
                    max={100}
                    onChange={setDiscount}
                    value={discount}
                    marks={{ 0: '0%', 100: '100%' }}
                    tooltip={{ formatter: value => `${value}%` }}
                  />
                </Form.Item>
                <Form.Item label="Final Price">
                  <InputNumber
                    value={(selectedProduct.price * (1 - discount / 100)).toFixed(2)}
                    disabled
                    style={{ width: '100%' }}
                    prefix="Rs."
                  />
                </Form.Item>
                <Button type="primary" onClick={addToSuperDeals}>
                  Add to Super Deals
                </Button>
              </Form>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
