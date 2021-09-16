import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import './styles.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function Login({onAuthHandler}) {

    const onSubmitHandler = data => {
        onAuthHandler(data);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '120px'}}>
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onSubmitHandler}
                    //onFinishFailed={}
                >
                    <Form.Item
                        style={{color: 'white'}}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{color: 'white'}}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <div className="button_login_submit">
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                        <div className="link_to_register">
                            <Link to="/register">If you don't have any account</Link>
                        </div>
                        <div className="link_to_register">
                            <Link to="/forgot">Forgot password?</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;