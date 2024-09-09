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
  const [currentTab, setCurrentTab] = useState('allProducts');
  const [flashDeals, setFlashDeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/products/allproducts'); // Ensure the backend endpoint is correct
      setAllProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products. Please try again.');
      setLoading(false);
    }
  };

  // Fetch flash deals (products with a discount)
  const fetchFlashDeals = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/products/allproducts'); // Ensure backend is returning discounts
      const flashDeals = response.data.filter(product => product.discount > 0);
      setFlashDeals(flashDeals);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flash deals:', error);
      message.error('Failed to fetch flash deals. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchFlashDeals();
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

  // Handle tab change
  const handleMenuClick = ({ key }) => {
    setCurrentTab(key);
    if (key === 'allProducts') {
      setFilteredProducts(allProducts);
    } else if (key === 'flashDeals') {
      fetchFlashDeals();
    }
  };

  const addToSuperDeals = async () => {
    if (selectedProduct) {
      try {
        const response = await axios.put(`http://localhost:4000/api/products/updatediscount/${selectedProduct.id}`, {
          discount
        });

        if (response.data.success) {
          message.success('Product added to Super Deals successfully!');
          fetchAllProducts(); // Refetch products after update
          fetchFlashDeals();
        } else {
          message.error('Failed to add product to Super Deals');
        }
      } catch (error) {
        console.error('Error updating discount:', error);
        message.error('Failed to update discount. Please try again.');
      }
    }
  };

  const removeFromSuperDeals = async (record) => {
    confirm({
      title: 'Are you sure you want to remove this product from Super Deals?',
      content: `${record.name} - Rs. ${record.price}`,
      onOk: async () => {
        try {
          const response = await axios.put(`http://localhost:4000/api/products/updatediscount/${record.id}`, {
            discount: 0
          });

          if (response.data.success) {
            message.success('Product removed from Super Deals successfully!');
            fetchAllProducts(); // Refetch products after removal
            fetchFlashDeals();
          } else {
            message.error('Failed to remove product from Super Deals');
          }
        } catch (error) {
          console.error('Error removing discount:', error);
          message.error('Failed to remove discount. Please try again.');
        }
      },
      onCancel() {
        console.log('Removal canceled');
      },
    });
  };

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
        currentTab === 'allProducts' ? (
          <Button type="primary" onClick={() => handleProductSelect(record)}>
            Select
          </Button>
        ) : (
          <Button type="danger" onClick={() => removeFromSuperDeals(record)}>
            Remove
          </Button>
        )
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} onClick={handleMenuClick} selectedKeys={[currentTab]}>
          <Menu.Item key="allProducts">
            All Products
          </Menu.Item>
          <Menu.Item key="flashDeals">
            Flash Deals
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
            dataSource={currentTab === 'allProducts' ? filteredProducts : flashDeals}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            loading={loading}
          />
          {selectedProduct && currentTab === 'allProducts' && (
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
