import React from 'react';

// helpers
import {fromStrToTime} from "../../helpers/timeHelper";

// components
import Forecast from "../Forecast";

// css
import './styles.css';

import { Layout, Input  } from 'antd';

// from ant
const { Content } = Layout;
const { Search } = Input;

const ForecastPanel = ({onSearchHandler, render, location, current, forecast}) => {

    return (
        <>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <div>
                        <h1>Input the city:</h1>
                        <Search placeholder="input search text" onSearch={onSearchHandler} enterButton />
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
                                            <h2 style={{textAlign: 'center'}}>{current.temp_c} &#176;C</h2>
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