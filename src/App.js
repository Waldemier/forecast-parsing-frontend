// hooks
import {useEffect, useState} from 'react';
import { Route, Switch, useHistory  } from 'react-router-dom';

// External functionality
import axios from "axios";
import {Button} from 'antd';

// components
import Main from './pages/Main';
import Login from "./pages/Login";

// helpers
import getCookie from './helpers/getCookie'

// css
import './App.css';
import Register from "./pages/Register";

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

    const onLogoutHandler = async () => {
        const data = await axios.post("https://localhost:5001/api/Auth/logout", {}, { withCredentials: true });
        console.log(data)
        setAuthorized(false);
        history.push('/login');
    }

    const onRegisterHandler = async data => {
            try
            {
                const response = await axios.post("https://localhost:5001/api/Auth/register", {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    passwordConfirm: data.confirm
                });
                console.log(response);
                history.push("/login");
            }
            catch (exception) {
                console.log("Register exception", exception);
            }
    }

    useEffect(() => {
        let token = getCookie("access_token");
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
            <div className="header">
                <div className="header_options">
                    <h1 className="header_logo">Weather Forecast</h1>
                    {
                        authorized ? <Button className="button_logout" type="primary" onClick={onLogoutHandler}>Logout</Button>: null
                    }
                </div>
            </div>
            <div className="routes">
                <Switch>
                    {
                        authorized ?
                            <Route exact path="/weaterforecast" component={Main} />
                            :
                            (
                                <>
                                    <Route exact path="/login">
                                        <Login onAuthHandler={onAuthHandler}/>
                                    </Route>
                                    <Route exact path="/register">
                                        <Register onRegisterHandler={onRegisterHandler}/>
                                    </Route>
                                </>
                            )
                    }
                </Switch>
            </div>
            <div className="footer">
            </div>
        </div>
    );
}

export default App;