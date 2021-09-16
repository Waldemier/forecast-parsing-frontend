import React, {useEffect} from 'react';

import './styles.css';
import {useHistory, useParams} from "react-router-dom";
import {Spin} from "antd";

const ConfirmRegistration = ({onConfirmHandler}) => {
    let history = useHistory();
    const { confirmToken }  = useParams();

    useEffect(async () => {
        console.log("VERIFY BEGIN")
        await onConfirmHandler(confirmToken);
        console.log("VERIFY AFTER")
        history.push("/login");
    },[])

    return (
      <div>
          <Spin size="large" />
      </div>
    );
};

export default ConfirmRegistration;