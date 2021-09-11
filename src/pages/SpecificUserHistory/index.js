import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import getCookie from "../../helpers/getCookie";
import {Table} from "antd";
import columns from "../../common/adminHistoryTable";

import './styles.css';

const SpecificUserHistory = () => {

    const [history, setHistory] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const { userId } = useParams();

    const onChangeHistoryPagination = async pageNumber => {
        const response = await axios.get(`https://localhost:5001/api/Admin/${userId}?PageNumber=${pageNumber}`,
            { headers: { "Authorization": `Bearer ${getCookie("access_token")}` }});
        console.log(response)
        setHistory(response.data);
        const paginationHistoryHeaderObject = JSON.parse(response.headers["x-history-pagination"]);
        setTotalPages(paginationHistoryHeaderObject.TotalPages);
    }

    useEffect(async () => {
        const response = await axios.get(`https://localhost:5001/api/admin/${userId}`,
            { headers: { "Authorization": `Bearer ${getCookie("access_token")}` } });
        console.log(response.data)

        const paginationHistoryHeaderObject = JSON.parse(response.headers["x-history-pagination"]);
        setTotalPages(paginationHistoryHeaderObject.TotalPages);
        setHistory(response.data);
    }, [])

    return (
        <div className="history_table_container">
            <Table columns={columns} dataSource={history} pagination={{ total: totalPages*10, onChange: onChangeHistoryPagination, showSizeChanger: false }} />
        </div>
    );
};

export default SpecificUserHistory;
