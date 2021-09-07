// hooks
import {useEffect, useState} from 'react';
import { Route, Switch, useHistory  } from 'react-router-dom';

// External functionality
import axios from "axios";
import {Button, Layout, Menu} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

// components
import Main from './pages/Main';
import Login from "./pages/Login";

// helpers
import getCookie from './helpers/getCookie'

// css
import './App.css';

// from ant
const { Header } = Layout;

const App = () => {

    const [authorized, setAuthorized] = useState(false);
    let history = useHistory();

    const onAuthHandler = async data => {
        try
        {
            const response = await axios.post("https://localhost:5001/api/Auth/login",
                { email: data.email, password: data.password }, { withCredentials: true });

            if(response.data.statusCode !== 500) {
                setAuthorized(true);
            }
        }
        catch (exception)
        {
            console.log("exception", exception)
        }
    }

    useEffect(() => {
        var token = getCookie("access_token");
        if(token) {
            setAuthorized(true);
            history.push('/weaterforecast');
        }
        else {
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        if(authorized) {
            history.push('/weaterforecast');
        }
    }, [authorized]);

    return (
        <div>
            <Header>
                <div><h1 className="logo">Weather Forecast</h1></div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
            </Header>
            <div className="routes">
                <Switch>
                    {
                        authorized ?
                            <Route exact path="/weaterforecast" component={Main} />
                            :
                            <Route exact path="/login">
                                <Login onAuthHandler={onAuthHandler}/>
                            </Route>
                    }
                </Switch>
            </div>
        </div>
    );
}

export default App;