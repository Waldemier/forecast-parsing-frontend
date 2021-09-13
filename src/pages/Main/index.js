// hooks
import {useEffect, useState} from 'react';

// External functionality
import axios from "axios";

// components
import ForecastPanel from "../../components/ForecastPanel";
import History from '../../components/History';

// css
import './styles.css';
import getCookie from "../../helpers/getCookie";
import axiosTemplate from "../../common/axiosTemplate";

// from ant

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
        const data = await axiosTemplate("GET", `WeatherForecast/forecast?city=${city}&days=${days}`, {},
            { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });

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
        const data = await axiosTemplate("GET", `WeatherForecast/history?Min=${filter.min}&Max=${filter.max}`,
            {},  { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });
        setHistory(data.data);
    }

    const onOrderByHandler = async () => {
        setOrderBy(prevValue => prevValue === 'Asc' ? 'Desc' : 'Asc');
        console.log(orderBy)
        const data = await axiosTemplate("GET", `WeatherForecast/history?OrderBy=${orderBy}`,
            {}, { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });
        setHistory(data.data);
        setOrderByIndicator(true);
    }

    useEffect(async () => {
        const data = await axiosTemplate("GET", `WeatherForecast/history`,
            {}, { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });
        setHistory(data.data);
    }, []);

    useEffect(async () => {
        const data = await axiosTemplate("GET", `WeatherForecast/history`,
            {}, {"Authorization": `Bearer ${localStorage.getItem("access_token")}`});
        setHistory(data.data);
    }, [location]);

    return (
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
    );
}

export default Main;