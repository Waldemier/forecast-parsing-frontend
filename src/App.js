// hooks
import {useEffect, useState} from 'react';
import {Link, Redirect, Route, Switch, useHistory} from 'react-router-dom';

// External functionality
import {Button} from 'antd';
import axiosTemplate from "./common/axiosTemplate";

// components
import Main from './pages/Main';
import Login from "./pages/Login";
import Admin from "./pages/Admin";

// css
import './App.css';
import Register from "./pages/Register";

// common
import ROLES from '../src/common/roles';
import Update from "./pages/Update";
import Create from "./pages/Create";
import SpecialUserHistory from "./pages/SpecialUserHistory";
import ConfirmRegistration from "./pages/Verify";
import {
    successConfirmation,
    warnConfirmation,
    successRegister,
    rejectedRegister,
    successForgotProcess,
    rejectedForgotProcess,
    rejectedVerificationForgotPasswordProcess,
    successChangingPasswordProcess,
    rejectedChangingPasswordProcess,
    incorrectPasswordDuringLogin,
    newlyUserCreatedSuccessfully, userUpdateSuccessfully
} from './helpers/ModalFunctions';
import ForgotPassword from "./pages/Forgot";
import ChangingPassword from "./pages/ChangingPassword";

const App = () => {

    const [authorized, setAuthorized] = useState(false);
    const [role, setRole] = useState(null);
    const [users, setUsers] = useState(null);
    const [roleForUpdate, setRoleForUpdate] = useState(1);
    const [roleForCreate, setRoleForCreate] = useState(1);
    const [spinningProcess, setSpinningProcess] = useState(false);

    let history = useHistory();

    const onAuthHandler = async data => {
        try
        {
            const response = await axiosTemplate("POST", "Auth/login",
                { email: data.email, password: data.password }, { withCredentials: true });
            if(response.data.statusCode !== 500) {
                localStorage.setItem("user", response.data.user);
                localStorage.setItem("access_token", response.data.access_token)
                setAuthorized(true);
            }
        }
        catch (exception)
        {
            incorrectPasswordDuringLogin();
        }
    }

    const onLogoutHandler = async () => {
        await axiosTemplate("POST", "Auth/logout", {}, { withCredentials: true });
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
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
                setSpinningProcess(true);
                await axiosTemplate("POST", "Auth/register", {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    passwordConfirm: data.confirm
                });
                setSpinningProcess(false);
                successRegister();
                history.push("/login");
            }
            catch (exception) {
                window.location.reload();
                rejectedRegister();
                console.log("Register exception", exception);
            }
    }

    const onUpdateHandler = async (userId, data) => {
        const response = await axiosTemplate("PUT", `admin/update/${userId}`, {
            name: data.name,
            email: data.email,
            role: roleForUpdate
        },  { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });

        console.log(response);
        userUpdateSuccessfully();
        history.push("/admin");
    }

    const onCreateHandler = async data => {
        await axiosTemplate("POST", 'admin/create', {
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password
        },  { "Authorization": `Bearer ${localStorage.getItem("access_token")}` });

        newlyUserCreatedSuccessfully();
        history.push("/admin");
    }

    const onConfirmHandler = async verifyLink => {
        const response = await axiosTemplate("POST", `auth/confirm/${verifyLink}`);
        if(response.status === 200) {
            successConfirmation();
        }
        else {
            warnConfirmation();
        }
    }

    const onForgotPasswordHandler = async data => {
        setSpinningProcess(true);
        const response = await axiosTemplate("POST", "auth/forgot", { email: data.email });
        setSpinningProcess(false);

        if(response.status === 200) {
            successForgotProcess();
            history.push("/login");
        }
        else {
            rejectedForgotProcess();
        }
    }

    const onChangePasswordHandler = async data => {
        setSpinningProcess(true);
        const response = await axiosTemplate("POST", "auth/forgot/change", { newlyPassword: data.newlyPassword });
        setSpinningProcess(false);
        if(response.status === 200) {
            successChangingPasswordProcess();
            history.push("/login");
        }
        else {
            rejectedChangingPasswordProcess();
            history.push("/login");
        }
    }

    const onVerifyTokenHandler = async verifyToken => {
        setSpinningProcess(true);
        const response = await axiosTemplate("POST", `auth/verify/${verifyToken}`);
        setSpinningProcess(false);
        if(response.status !== 200) {
            rejectedVerificationForgotPasswordProcess();
            history.push("/login");
        }
    }

    // If user will be wanting to refresh the page, this logic will have checked if token exists
    useEffect(() => {
        let token = localStorage.getItem("access_token");
        if(token) {
            setAuthorized(true);
            history.push('/weatherforecast');
        }
        else {
            //history.push('/login');
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
                            role === ROLES.ADMIN ? <Button className="admin_panel_button" type="primary" onClick={onAdminPanelHandler}>Admin panel</Button>: null
                        }
                        {
                            authorized ? <Button className="button_logout" type="primary" onClick={onLogoutHandler}>Logout</Button>: null
                        }
                    </div>
                </div>
            </div>
            <div className="routes">
                <Switch>
                        <>
                            <Route exact path="/weatherforecast">
                                { authorized ? <Main userRole={role}/>: <Redirect to="login"/>}
                            </Route>
                            {
                                authorized && role === ROLES.ADMIN ?
                                    (
                                        <>
                                            <Route exact path="/admin">
                                                <Admin users={users} setUsers={setUsers} />
                                            </Route>
                                            {
                                                users ?
                                                    (
                                                        <>
                                                            <Route exact path="/update/:userId/:name/:email">
                                                                    <Update onUpdateHandler={onUpdateHandler} roleForUpdate={roleForUpdate} setUpdate={setRoleForUpdate} />
                                                                </Route>
                                                                <Route exact path="/create">
                                                                    <Create onCreateHandler={onCreateHandler} roleForCreate={roleForCreate} setCreate={setRoleForCreate} />
                                                                </Route>
                                                                <Route exact path="/history/:userId">
                                                                    <SpecialUserHistory />
                                                                </Route>
                                                        </>

                                                    )
                                                    : null
                                            }
                                        </>
                                    )

                                    : null
                            }

                            <Route exact path="/login">
                                <Login onAuthHandler={onAuthHandler}/>
                            </Route>
                            <Route exact path="/register">
                                <Register onRegisterHandler={onRegisterHandler} spinningProcess={spinningProcess}/>
                            </Route>
                            <Route exact path="/confirm/:confirmToken">
                                <ConfirmRegistration onConfirmHandler={onConfirmHandler}/>
                            </Route>
                            <Route exact path="/forgot">
                                <ForgotPassword spinningProcess={spinningProcess} onForgotPasswordHandler={onForgotPasswordHandler}/>
                            </Route>
                            <Route exact path="/forgot/change/:verifyToken">
                                    <ChangingPassword
                                        spinningProcess={spinningProcess}
                                        onChangePasswordHandler={onChangePasswordHandler}
                                        onVerifyTokenHandler={onVerifyTokenHandler} />
                            </Route>
                        </>
                </Switch>
            </div>
            <div className="footer">
            </div>
        </div>
    );
}

export default App;