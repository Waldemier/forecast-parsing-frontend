import {Space} from "antd";
import {Link} from "react-router-dom";
import React from "react";

export default (deleteMethod) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <p style={{textAlign: 'center'}}>{text}</p>,
        width: 1
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 2
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: number => <p style={{textAlign: 'center'}}>{number === 0 ? "Admin": "System user"}</p>,
        width: 2,
    },
    {
        title: 'Action',
        key: 'action',
        width: 1,
        render: (text, record) => {
            return ( record.role !== 0 ? (
                    <Space size="middle">
                        <Link to={`/history/${record.id}`}>History</Link>
                        <Link to={`/update/${record.id}`}>Update</Link>
                        <a onClick={() => deleteMethod(record.email, record.id)} style={{color:'red'}}>Delete</a>
                    </Space>
                ): <p style={{color:'red'}}>Permission denied, cause user is an admin</p>
            )},
    },
];