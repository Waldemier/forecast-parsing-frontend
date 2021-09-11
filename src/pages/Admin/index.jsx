import React, {useEffect, useState} from 'react';
import axios from "axios";
import getCookie from "../../helpers/getCookie";
import {Button, Table} from "antd";

import './styles.css';
import {PlusOutlined} from "@ant-design/icons";
import columns from '../../common/adminUsersTable';
import {Link} from "react-router-dom";

function Admin({users, setUsers}) {

    const [totalPages, setTotalPages] = useState(1);
    const [reload, setReload] = useState(false);

    const onDeleteHandler = async (email, id) => {
        if(window.confirm(`Are you sure you want to delete ${email}?`)) {
            await axios.delete(`https://localhost:5001/api/Admin/Delete/${id}`,
                { headers: { "Authorization": `Bearer ${getCookie("access_token")}` }});
            setReload(prev => !prev);
        }
    }

    const onChangePagination = async pageNumber => {
        const response = await axios.get(`https://localhost:5001/api/Admin?PageNumber=${pageNumber}`,
            { headers: { "Authorization": `Bearer ${getCookie("access_token")}` }});
        console.log(response)
        setUsers(response.data);
        const paginationHeaderObject = JSON.parse(response.headers["x-pagination"]);
        setTotalPages(paginationHeaderObject.TotalPages);
    }

    useEffect(async () => {
        const response = await axios.get("https://localhost:5001/api/Admin",
            { headers: { "Authorization": `Bearer ${getCookie("access_token")}` }});
        setUsers(response.data);

        const paginationHeaderObject = JSON.parse(response.headers["x-pagination"]);
        setTotalPages(paginationHeaderObject.TotalPages);
    }, [ , reload])

    return (
        <div className="container_admin_table">
            <div>
                <div className="container_admin_table_button">
                    <Link to="/create"><Button type="primary" style={{marginBottom: 10,  background: '#32CD32', borderColor: '#32CD32'	}}><PlusOutlined />Add a new user</Button></Link>
                </div>
                <Table columns={columns(onDeleteHandler)} dataSource={users} pagination={{ total: totalPages*10, onChange: onChangePagination, showSizeChanger: false }} />
            </div>
        </div>
    );
}

export default Admin;