import {Button, Space} from "antd";
import {Link} from "react-router-dom";
import React from "react";

import ROLES from '../common/roles';

export default (deleteMethod) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <p style={{textAlign: 'center'}}>{text}</p>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: roleNumber => <p style={{textAlign: 'center'}}>{roleNumber === ROLES.ADMIN ? "Admin":
                                                                        roleNumber === ROLES.SYSTEM_USER ? "System User":
                                                                                                                    "Unconfirmed User"}</p>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
            return ( record.role !== ROLES.ADMIN ? (
                    <Space size="middle">
                        {
                            record.role !== ROLES.UNCONFIRMED_USER ? (
                                    <Link to={`/history/${record.id}`}><Button type="primary" style={{ background: '#FFFF33', color: "black", borderColor:"#FFFF00" }}>History</Button></Link>
                                )
                            : null
                        }
                        <Link to={`/update/${record.id}/${record.name}/${record.email}`}><Button type="primary">Update</Button></Link>
                        <Button type="primary" onClick={() => deleteMethod(record.email, record.id)} danger>Delete</Button>
                    </Space>
                ): <p style={{color:'red'}}>Permission denied, cause user is an admin</p>
            )},
    },
];