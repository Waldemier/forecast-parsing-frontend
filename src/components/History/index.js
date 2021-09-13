import {useEffect, useRef} from "react";

// External functionality
import { Collapse, Slider, Button  } from 'antd';
import { CaretRightOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import './styles.css';

// helpers
import { timeISOToUAFormat } from '../../helpers/timeHelper';

const { Panel } = Collapse;


const History = ({data, onOrderByHandler, orderByIndicator, onFilterHandler, setFilter}) => {

    const refScroll = useRef();

    useEffect(() => {
        refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }, [orderByIndicator]);


    const onSliderChangeHandler = (event) => {
        setFilter({min:event[0], max: event[1]});
    }

    return (
        <div ref={refScroll} className="history_side">
            <div className="history_options">
                <div className="slider">
                    <Slider range min={-100} max={100} defaultValue={[-100, 100]} onChange={onSliderChangeHandler} />
                    <Button className="button_ok" type="primary" onClick={onFilterHandler}>OK</Button>
                </div>
                <div className="ordering_arrows" onClick={onOrderByHandler}>
                    <ArrowUpOutlined />
                    <ArrowDownOutlined />
                </div>
            </div>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {
                    data ?
                        data.map(item =>
                            <Panel header={timeISOToUAFormat(item.date)} key={item.id} className="site-collapse-custom-panel">
                                <p>City: {item.city}</p>
                                <p>Temperature: {item.temperature}&#176;C</p>
                            </Panel>)
                        :
                        <h1 style={{marginTop: 40}}>History is empty</h1>
                }
            </Collapse>
        </div>
    );
}

export default History;