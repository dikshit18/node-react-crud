/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { Layout, Breadcrumb, Modal } from 'antd/lib';
import '../../../node_modules/antd/dist/antd.css';
import classes from './TableGrid.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import NewProductForm from '../NewProductForm/NewProductForm';
import FormModal from '../FormModal/FormModal';

const { Header, Content } = Layout;
const tableGrid = props => {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const [modelVisible, updateModelVisibility] = useState(false);
  //const [confirmModalLoading, updateConfirmModalLoading] = useState(false);
  const [productDetails, updateProductDetails] = useState({});

  // useEffect(() => {
  //   if (deletePop) updateModelVisibility(false);
  // });

  //const handleDelete = productId => {
  //const dataSource = [...apiResponse];
  //const updatedDS = dataSource.filter(item => item.productId !== productId);
  //udpateAPIResponse(updatedDS);
  //};
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
  ];
  // const onModalSubmission = () => {
  //   //updateConfirmModalLoading(true);
  //   // Call API to add Products
  //   setTimeout(() => {
  //     updateModelVisibility(false);
  //     updateConfirmModalLoading(false);
  //   }, 2000);
  // };
  // const onModalCancel = () => {
  //   updateModelVisibility(false);
  // };
  const cancel = () => {
    updateModelVisibility(false);
  };

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
              dataSource={props.products}
              onChange={onChange}
              pagination={{ pageSize: 10 }}
              onRow={(record, rowIndex) => {
                // eslint-disable-next-line no-unused-expressions
                return {
                  onClick: event => {
                    updateModelVisibility(true);
                    updateProductDetails({ ...record });
                  }, // click row
                };
              }}
            />
            <FormModal
              visible={modelVisible}
              cancel={cancel}
              productDetails={productDetails}
              onUpdate={props.onUpdate}
              onDelete={props.onDelete}
            />
          </div>
        </Content>
      </Layout>
    </Auxiliary>
  );
};

export default tableGrid;
