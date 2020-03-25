/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { Layout, Menu, Breadcrumb, Modal } from 'antd/lib';
import 'antd/dist/antd.css';

import { ShopOutlined, CloudOutlined } from '@ant-design/icons';
import classes from './Leftgrid.module.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import TableGrid from '../TableGrid/TableGrid';

const { Sider } = Layout;
const LeftGrid = () => {
  const [collapsed, updateCollapsed] = useState(false);
  const [modelVisible, updateModelVisibility] = useState(false);
  const [confirmModalLoading, updateConfirmModalLoading] = useState(false);

  const onCollapse = collapsed => {
    updateCollapsed(collapsed);
  };
  const showModal = () => {
    console.log('Span CLicked');
    updateModelVisibility(true);
  };

  const onModalSubmission = () => {
    updateConfirmModalLoading(true);
    // Call API to add Products
    setTimeout(() => {
      updateModelVisibility(false);
      updateConfirmModalLoading(false);
    }, 2000);
  };

  const modalCancel = () => {
    updateModelVisibility(false);
  };

  return (
    <Auxiliary>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={300}>
          <div className={classes.logo} />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <ShopOutlined />
              <span className='nav-text'>List of Products</span>
            </Menu.Item>
            <Menu.Item key='2' onClick={showModal}>
              <CloudOutlined />
              <span className='nav-text'>Add Product</span>
            </Menu.Item>
            <Modal
              title='Title'
              visible={modelVisible}
              onOk={onModalSubmission}
              confirmLoading={confirmModalLoading}
              onCancel={modalCancel}
            >
              <p>Hi</p>
            </Modal>
          </Menu>
        </Sider>
        <TableGrid />
      </Layout>
    </Auxiliary>
  );
};

export default LeftGrid;
