// hooks
import {useEffect, useState} from 'react';

// External functionality
import axios from "axios";
import { Layout, Menu  } from 'antd';

// components
import ForecastPanel from "./components/ForecastPanel";
import History from './components/History';

// css
import './App.css';

// from ant
const { Header, Footer } = Layout;

const App = () => {

    const [location, setLocation] = useState(null);
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [history, setHistory] = useState(null);

    const [render, setRender] = useState(false);

    const onSearch = async city =>
    {
        const data = await axios.get(`https://localhost:5001/api/WeatherForecast/forecast?city=${city}&days=2`);

        if(data.data.statusCode !== 500) {
            setCurrent(data.data.current);
            setForecast(data.data.forecast.forecastday);
            setLocation(data.data.location);
            setRender(true);
        }
        else
            setRender(false);
    };

    useEffect(async () => {
        const data = await axios.get(`https://localhost:5001/api/WeatherForecast/history`);
        setHistory(data.data);
    }, []);

    useEffect(async () => {
        const data = await axios.get(`https://localhost:5001/api/WeatherForecast/history`);
        setHistory(data.data);
    }, [location]);

    return (
        <Layout className="layout">
            <Header>
                <div><h1 className="logo">Weather forecast</h1></div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
            </Header>
            <div className="main_content">
                <History data={history} />
                <ForecastPanel onSearchHandler={onSearch}
                               render={render}
                               current={current}
                               location={location}
                               forecast={forecast}
                />
            </div>
            <Footer style={{ textAlign: 'center' }} />
        </Layout>
    );
}

export default App;