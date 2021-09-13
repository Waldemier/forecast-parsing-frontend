import React from "react";
import { timeISOToUAFormat } from '../helpers/timeHelper';

export default [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: date => <p>{timeISOToUAFormat(date)}</p>
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        render: text => <p>{text}</p>
    },
    {
        title: 'Temperature',
        dataIndex: 'temperature',
        key: 'temperature',
        render: temperature => <p>{temperature}&deg;C</p>
    }
];