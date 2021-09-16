import React, {useEffect} from 'react';

import {Form, Input, Button, Spin} from 'antd';
import {Link} from "react-router-dom";
import './styles.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


function Register({spinningProcess, onRegisterHandler}) {
    useEffect(() => {
        console.log(spinningProcess)
    }, [])
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '120px'}}>
            {
                spinningProcess ? (
                    <div className="register_spin">
                        <Spin size="large" />
                    </div>
                    )
                    :
                    (
                        <div>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onRegisterHandler}
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm"
                                    name="confirm"
                                    rules={[{ required: true, message: 'Please input your confirm' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <div className="button_register_submit">
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </div>
                                    <div className="link_to_login">
                                        <Link to="/login">If you have an account</Link>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    )
            }
        </div>
    )
}

export default Register;