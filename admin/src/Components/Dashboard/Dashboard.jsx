import React from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Card, Col, Row } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Augest','October','November','December'],
    datasets: [
      {
        label: 'Sales',
        data: [],
        fill: false,
        borderColor: '#4caf50',
      },
    ],
  };

  const barChartData = {
    labels: ['Vegetables', 'Bakery', 'Spices', 'Household', 'Baby Products', 'Canned Products','Snacks','Beverages','Frozen Foods','Fruits'],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // New data for the number of users
  const userChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Augest','October','November','December'],
    datasets: [
      {
        label: 'Users',
        data: [],
        fill: false,
        borderColor: '#ff6384',
        backgroundColor: '#ff6384',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Sales Trend" bordered={false}>
            <Line data={lineChartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Category Distribution" bordered={false}>
            <Bar data={barChartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="User Growth" bordered={false}>
            <Line data={userChartData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
