import React, {useEffect, useState} from 'react';
import axios from "axios";
import getCookie from "../../helpers/getCookie";
import {Table} from "antd";

import './styles.css';
import columns from '../../common/adminUsersTable';

function Admin({}) {

    const [users, setUsers] = useState(null);
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
            <Table columns={columns(onDeleteHandler)} dataSource={users} pagination={{ total: totalPages*10, onChange: onChangePagination, showSizeChanger: false }} />
        </div>
    );
}

export default Admin;