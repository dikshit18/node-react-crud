import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Radio, InputNumber } from 'antd';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const CollectionCreateForm = ({ visible, onCancel, productDetails, onUpdate, onDelete }) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <Modal
      visible={visible}
      title='Update Product'
      okText='Update'
      cancelText='Cancel'
      onCancel={onCancel}
      footer={[
        <Button key='back' style={{ float: 'left' }} onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          style={{ float: 'left' }}
          loading={loadingSubmit}
          onClick={() => {
            form
              .validateFields()
              .then(async values => {
                loadingSubmit(true);
                await onUpdate(values);
                setLoadingSubmit(false);
                onCancel();
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          Submit
        </Button>,
        // Add handlers for this Button
        <Button
          key='delete'
          type='danger'
          loading={loadingDelete}
          onClick={() => {
            form
              .validateFields()
              .then(async values => {
                setLoadingDelete(true);
                await onDelete(values.productId);
                setLoadingDelete(false);
                onCancel();
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          Delete
        </Button>,
      ]}
    >
      <Form
        form={form}
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        //validateMessages={validateMessages}
        initialValues={{
          // eslint-disable-next-line react/destructuring-assignment
          productName: productDetails.productName,
          productType: productDetails.productType,
          price: productDetails.price,
          productId: productDetails.productId,
        }}
      >
        <Form.Item
          name='productName'
          label='Product Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='productType'
          label='Product Type'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='price'
          label='Price'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 1000000000,
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          hidden={true}
          name='productId'
          rules={[
            {
              required: true,
            },
          ]}
        ></Form.Item>
      </Form>
    </Modal>
  );
};

const formModal = props => {
  console.log('ProductDetails', props.productDetails);

  return (
    <Auxiliary>
      <CollectionCreateForm
        visible={props.visible}
        onCancel={() => props.cancel()}
        productDetails={props.productDetails}
        onUpdate={updatedProductDetails => props.onUpdate(updatedProductDetails)}
        onDelete={productId => props.onDelete(productId)}
      />
    </Auxiliary>
  );
};
export default formModal;
