/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { Layout, Breadcrumb } from 'antd/lib';
import 'antd/dist/antd.css';
import classes from './TableGrid.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const { Header, Content } = Layout;

const data = [
  {
    productId: 1,
    productName: 'Washing Machine',
    productType: 'Electronics',
    price: 15000,
  },
  {
    productId: 2,
    productName: 'Samsung Mobile Phone',
    productType: 'Electronics',
    price: 10999,
  },
  {
    productId: 3,
    productName: 'Rope',
    productType: 'Hardware',
    price: 210,
  },
  {
    productId: 4,
    productName: 'Screw Driver Set',
    productType: 'Hardware',
    price: 2000,
  },
  {
    productId: 5,
    productName: 'Cereal',
    productType: 'Food and Beverage',
    price: 90,
  },
];

const TableGrid = () => {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const [apiResponse, udpateAPIResponse] = useState(data);
  const handleDelete = productId => {
    const dataSource = [...apiResponse];
    const updatedDS = dataSource.filter(item => item.productId !== productId);
    udpateAPIResponse(updatedDS);
  };
  const dbSchema = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      sorter: (a, b) => a.productType.localeCompare(b.productType),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: { compare: (a, b) => a.price - b.price },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) =>
        data.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.productId)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <Auxiliary>
      <Layout className={classes['site-layout']}>
        <Header className={classes['site-layout-background']} style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className={classes['site-layout-background']}
            style={{ padding: 24, minHeight: 360 }}
          >
            <Table
              columns={dbSchema}
              dataSource={apiResponse}
              onChange={onChange}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </Content>
      </Layout>
    </Auxiliary>
  );
};

export default TableGrid;
