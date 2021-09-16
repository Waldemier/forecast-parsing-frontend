import React from 'react';
import {Button, Form, Input, Spin} from "antd";

import './styles.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ForgotPassword = ({spinningProcess, onForgotPasswordHandler}) => {

    return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '120px'}}>
                {
                    spinningProcess ? (
                        <div className="forgot_spin">
                            <Spin size="large" />
                        </div>) : (
                        <div>
                            <Form
                                {...layout}
                                name="basic"
                                onFinish={onForgotPasswordHandler}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Email field is required' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <div className="button_forgot_submit">
                                        <Button type="primary" htmlType="submit">
                                            Continue
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    )
                }
            </div>
    );
};

export default ForgotPassword;