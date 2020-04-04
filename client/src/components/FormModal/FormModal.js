import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Radio, InputNumber } from 'antd';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const CollectionCreateForm = ({
  visible,
  onCancel,
  productDetails,
  onUpdate,
  onDelete,
  createActive,
  onCreate,
}) => {
  useEffect(() => {
    console.log('Setting value for the first time');
    form.setFieldsValue({
      productName: productDetails ? productDetails.productName : null,
      productType: productDetails ? productDetails.productType : null,
      price: productDetails ? productDetails.price : null,
      productId: productDetails ? productDetails.productId : null,
    });
  }, [productDetails]);
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
        <Button key='back' style={{ float: createActive ? 'right' : 'left' }} onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          style={{ float: createActive ? 'right' : 'left' }}
          loading={loadingSubmit}
          onClick={() => {
            form
              .validateFields()
              .then(async values => {
                setLoadingSubmit(true);
                if (createActive) await onCreate(values);
                else await onUpdate(values);
                setLoadingSubmit(false);
                form.setFieldsValue({
                  productName: '',
                  productId: '',
                  price: '',
                  productType: '',
                });
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
          style={{ visibility: createActive ? 'hidden' : 'visible' }}
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
      {console.log('Executing')}

      <Form
        form={form}
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        //validateMessages={validateMessages}
        // initialValues={{
        //   // eslint-disable-next-line react/destructuring-assignment
        //   productName: productDetails ? productDetails.productName : null,
        //   productType: productDetails ? productDetails.productType : null,
        //   price: productDetails ? productDetails.price : null,
        //   productId: productDetails ? productDetails.productId : null,
        // }}
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
        <Form.Item hidden={true} name='productId'></Form.Item>
      </Form>
    </Modal>
  );
};

const formModal = props => {
  return (
    <Auxiliary>
      <CollectionCreateForm
        visible={props.visible}
        onCancel={() => props.cancel()}
        productDetails={props.productDetails}
        onUpdate={updatedProductDetails => props.onUpdate(updatedProductDetails)}
        onDelete={productId => props.onDelete(productId)}
        createActive={props.createActive}
        onCreate={productDetails => props.onCreate(productDetails)}
      />
    </Auxiliary>
  );
};
export default React.memo(formModal);
