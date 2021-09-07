// hooks
import {useEffect, useState} from 'react';

// External functionality
import axios from "axios";
import { Layout  } from 'antd';

// components
import ForecastPanel from "../../components/ForecastPanel";
import History from '../../components/History';

// css
import './styles.css';

// from ant
const { Header, Footer } = Layout;

const Main = () => {

    const [location, setLocation] = useState(null);
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [history, setHistory] = useState(null);
    const [orderBy, setOrderBy] = useState('Asc');
    const [days, setDays] = useState(2);
    const [render, setRender] = useState(false);
    const [orderByIndicator, setOrderByIndicator] = useState(false);
    const [filter, setFilter] = useState({});

    const onSearch = async city =>
    {
        const data = await axios.get(`https://localhost:5001/api/WeatherForecast/forecast?city=${city}&days=${days}`);

        if(data.data.statusCode !== 500) {
            setCurrent(data.data.current);
            setForecast(data.data.forecast.forecastday);
            console.log(forecast)
            setLocation(data.data.location);
            setOrderByIndicator(false);
            setRender(true);
        }
        else
            setRender(false);
    };

    const onFilterHandler = async () => {
        const data = await axios.get(`https://localhost:5001/api/WeatherForecast/history?Min=${filter.min}&Max=${filter.max}`);
        setHistory(data.data);
    }

    const onOrderByHandler = async () => {
        setOrderBy(prevValue => prevValue === 'Asc' ? 'Desc' : 'Asc');
        console.log(orderBy)
        const data = await axios.get(`https://localhost:5001/api/WeatherForecast/history?OrderBy=${orderBy}`);
        setHistory(data.data);
        setOrderByIndicator(true);
    }

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

            <div className="main_content">
                <History data={history}
                         onOrderByHandler={onOrderByHandler}
                         orderByIndicator={orderByIndicator}
                         onFilterHandler={onFilterHandler}
                         setFilter={setFilter}/>
                <ForecastPanel onSearchHandler={onSearch}
                               render={render}
                               current={current}
                               location={location}
                               forecast={forecast}
                               setDays={setDays}
                               daysAmount={days}
                />
            </div>
            <Footer style={{ textAlign: 'center' }} />
        </Layout>
    );
}

export default Main;