import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

function AddRoom() {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {

        try {
     
            await axios.post('/api/rooms/addroom', values);
            notification.success({ message: 'Room added successfully!' });
            form.resetFields();
        } catch (error) {
            notification.error({ message: 'Error adding room!', description: error.message });
        }
    };

    return (
        <div>
            <h1>Add Room</h1>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item name="name" label="Room Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="rentperday" label="Rent per Day" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="maxcount" label="Max Count" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="phonenumber" label="Phone Number" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="imageurls" label="Image URLs">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Room
                </Button>
            </Form>
        </div>
    );
}

export default AddRoom;


