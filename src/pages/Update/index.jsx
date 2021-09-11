import React from 'react';
import {Button, Dropdown, Form, Input, Menu} from "antd";
import {useParams} from "react-router-dom";
import {DownOutlined, UserOutlined} from "@ant-design/icons";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const Update = ({roleForUpdate, onUpdateHandler, setUpdate}) => {

    const { userId, name, email } = useParams();

    const handleMenuClick = data => {
        setUpdate(parseInt(data.key));
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key={0} icon={<UserOutlined />}>
                Admin
            </Menu.Item>
            <Menu.Item key={1} icon={<UserOutlined />}>
                System User
            </Menu.Item>
        </Menu>
    );

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '120px'}}>
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={
                        {
                            ["name"]: name,
                            ["email"]: email,
                            ["role"]: roleForUpdate
                        }
                    }
                    onFinish={data => onUpdateHandler(userId, data)}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Name field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Role field is required' }]}
                    >
                        <Input hidden />
                        <Dropdown overlay={menu}>
                            <Button>
                                {roleForUpdate === 0 ? <>Admin</>: <>System User</>} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <div className="button_register_submit">
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Update;