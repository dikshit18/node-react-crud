import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title='Update Product'
      okText='Update'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <Input type='textarea' />
        </Form.Item>
        <Form.Item name='modifier' className='collection-create-form_last-form-item'>
          <Radio.Group>
            <Radio value='public'>Public</Radio>
            <Radio value='private'>Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const formModal = props => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <Auxiliary>
      <CollectionCreateForm
        visible={props.visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </Auxiliary>
  );
};
export default formModal;
