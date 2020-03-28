import React, { useEffect } from 'react';
import { Form, Input, InputNumber } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!',
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: 'Must be between ${min} and ${max}',
  },
};
const newProductForm = props => {
  const onFinish = values => {
    console.log(values);
  };
  // eslint-disable-next-line no-unused-expressions

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Form
      {...layout}
      name='nest-messages'
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        // eslint-disable-next-line react/destructuring-assignment
        productName: props.productDetails ? props.productDetails.productName : null,
        productType: props.productDetails ? props.productDetails.productType : null,
        price: props.productDetails ? props.productDetails.price : null,
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
    </Form>
  );
};

export default newProductForm;
