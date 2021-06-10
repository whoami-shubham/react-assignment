import React, {useState} from "react";
import { Modal, Form, Input } from "antd";

export default function UserModal(props) {
  const { user, isModalVisible, handleCancel, updateUserDetails } = props;
  const [formValues,setFormValues] = useState(null);
  if(!user){
      return null;
  }

  const { name, email, phone, website } = user;
 
  const handleOk = () => {
      if(formValues){
        updateUserDetails({...user,...formValues});
      }
      handleCancel();
  };

  const onFinish = () => {};
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        {...layout}
        name="basic"
        key={isModalVisible}
        onFinish={onFinish}
        initialValues={{
          name: name,
          email: email,
          phone: phone,
          website: website,
        }}
        onFieldsChange={(_, allFields) => {
           const newDetails = {};
           allFields.forEach((field)=>{
                newDetails[`${field.name[0]}`] = field.value
           });
           setFormValues(newDetails);
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
