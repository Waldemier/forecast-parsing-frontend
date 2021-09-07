import React from 'react';

// helpers
import {fromStrToTime} from "../../helpers/timeHelper";

// components
import Forecast from "../Forecast";

// css
import './styles.css';

import { Layout, Input, Dropdown, Menu  } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// from ant
const { Content } = Layout;
const { Search } = Input;

const ForecastPanel = ({onSearchHandler, render, location, current, forecast, setDays, daysAmount}) => {

    const onDropdownHandling = event => {
        event.preventDefault();
        console.log(event)
    }

    const onItemHandling = event => {
        setDays(event.key);
    }

    const menu = (
        <Menu>
            <Menu.ItemGroup title="Days amount">
                <Menu.Item eventKey={1} onClick={onItemHandling}>1 day</Menu.Item>
                <Menu.Item eventKey={2} onClick={onItemHandling}>2 days</Menu.Item>
                <Menu.Item eventKey={3} onClick={onItemHandling}>3 days</Menu.Item>
                <Menu.Item eventKey={4} onClick={onItemHandling}>4 days</Menu.Item>
                <Menu.Item eventKey={5} onClick={onItemHandling}>5 days</Menu.Item>
                <Menu.Item eventKey={6} onClick={onItemHandling}>6 days</Menu.Item>
                <Menu.Item eventKey={7} onClick={onItemHandling}>7 days</Menu.Item>
                <Menu.Item eventKey={8} onClick={onItemHandling}>8 days</Menu.Item>
                <Menu.Item eventKey={9} onClick={onItemHandling}>9 days</Menu.Item>
                <Menu.Item eventKey={10} onClick={onItemHandling}>10 days</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    return (
        <>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <div className="main_options">
                        <Search placeholder="Input the city" onSearch={onSearchHandler} enterButton />
                        <div className="drop_option">
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" onClick={onDropdownHandling}>
                                    Days amount ({daysAmount ? daysAmount: <p>Forecast</p>}) <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="forecast_content">
                        <div className="forecast_content_current">
                            {
                                render ?
                                    <div>
                                        <div>
                                            <h1 style={{textAlign: 'center'}}>{location.country}</h1>
                                            <h1 style={{textAlign: 'center'}}>{location.name}</h1>
                                            <h2 style={{textAlign: 'center'}}>{fromStrToTime(current.last_updated)}</h2>
                                            <h2 style={{textAlign: 'center'}}>{current.temp_c}&#176;C</h2>
                                        </div>
                                        <Forecast forecast={forecast} />
                                    </div>
                                    :
                                    <h1>Please, fill in the input</h1>
                            }
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
};

export default ForecastPanel;