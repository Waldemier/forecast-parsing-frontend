import React, {useEffect, useState} from 'react';
import getCookie from "../../helpers/getCookie";
import {Button, Table} from "antd";

import './styles.css';
import {PlusOutlined} from "@ant-design/icons";
import columns from '../../common/adminUsersTable';
import {Link} from "react-router-dom";
import axiosTemplate from "../../common/axiosTemplate";

function Admin({users, setUsers}) {

    const [totalPages, setTotalPages] = useState(1);
    const [reload, setReload] = useState(false);

    const onDeleteHandler = async (email, id) => {
        if(window.confirm(`Are you sure you want to delete ${email}?`)) {
            await axiosTemplate("DELETE", `Admin/Delete/${id}`,
                {},  { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });
            setReload(prev => !prev);
        }
    }

    const onChangePagination = async pageNumber => {
        const response = await axiosTemplate("GET", `Admin?PageNumber=${pageNumber}`,
            {}, {"Authorization": `Bearer ${localStorage.getItem("access_token")}` });
        console.log(response)
        setUsers(response.data);
        const paginationHeaderObject = JSON.parse(response.headers["x-pagination"]);
        setTotalPages(paginationHeaderObject.TotalPages);
    }

    useEffect(async () => {
        const response = await axiosTemplate("GET", "Admin",
            {}, { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });
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