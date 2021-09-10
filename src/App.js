// hooks
import {useEffect, useState} from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom';

// External functionality
import axios from "axios";
import {Button} from 'antd';

// components
import Main from './pages/Main';
import Login from "./pages/Login";
import Admin from "./pages/Admin";

// helpers
import getCookie from './helpers/getCookie'

// css
import './App.css';
import Register from "./pages/Register";

// common
import ROLE from '../src/common/roles';

const App = () => {

    const [authorized, setAuthorized] = useState(false);
    const [role, setRole] = useState(null);

    let history = useHistory();

    const onAuthHandler = async data => {
        try
        {
            const response = await axios.post("https://localhost:5001/api/Auth/login",
                { email: data.email, password: data.password }, { withCredentials: true });
            if(response.data.statusCode !== 500) {
                localStorage.setItem("user", response.data.user);
                setAuthorized(true);
            }
        }
        catch (exception)
        {
            console.log("exception", exception)
        }
    }

    const onLogoutHandler = async () => {
        await axios.post("https://localhost:5001/api/Auth/logout", {}, { withCredentials: true });
        localStorage.removeItem("user");
        setRole(null);
        setAuthorized(false);
        history.push('/login');
    }

    const onAdminPanelHandler = () => {
        history.push('/admin');
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
            history.push('/weatherforecast');
        }
        else {
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        if(authorized) {
            let user = JSON.parse(localStorage.getItem("user"));
            setRole(user.Role);
            history.push('/weatherforecast');
        }
    }, [authorized]);

    return (
        <div>
            <div className="header">
                <div className="header_options">
                    <Link to="/weatherforecast"><h1 className="header_logo">Weather Forecast</h1></Link>
                    <div className="header_options_buttons">
                        {
                            role === ROLE.ADMIN ? <Button className="admin_panel_button" type="primary" onClick={onAdminPanelHandler}>Admin panel</Button>: null
                        }
                        {
                            authorized ? <Button className="button_logout" type="primary" onClick={onLogoutHandler}>Logout</Button>: null
                        }
                    </div>
                </div>
            </div>
            <div className="routes">
                <Switch>
                    {
                        authorized ?
                            (
                                <>
                                    <Route exact path="/weatherforecast">
                                        <Main userRole={role}/>
                                    </Route>
                                    {
                                        role === ROLE.ADMIN ?
                                            (
                                                <Route exact path="/admin">
                                                    <Admin />
                                                </Route>
                                            )
                                            : null
                                    }
                                </>
                            )
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