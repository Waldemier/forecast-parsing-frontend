import React, {useEffect} from 'react';
import {Button, Form, Input, Spin} from "antd";
import {useParams} from "react-router-dom";
import './styles.css';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ChangingPassword = ({onChangePasswordHandler, onVerifyTokenHandler, spinningProcess}) => {

    const { verifyToken } = useParams();

    useEffect(() => {
        onVerifyTokenHandler(verifyToken);
    }, [])

    return (

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '120px'}}>
                    {
                        spinningProcess ? (
                                <div className="changing_spin">
                                    <Spin size="large" />
                                </div>
                            ) :
                            (
                                <div>
                                    <Form
                                        {...layout}
                                        name="basic"
                                        onFinish={onChangePasswordHandler}
                                    >
                                        <Form.Item
                                            label="New password"
                                            name="newlyPassword"
                                            type="password"
                                            rules={[{ required: true, message: 'Newly password field is required' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item {...tailLayout}>
                                            <div className="button_change_password_submit">
                                                <Button type="primary" htmlType="submit">
                                                    Submit
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

export default ChangingPassword;