import {useEffect, useRef} from "react";

// External functionality
import { Collapse  } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import './styles.css';

// helpers
import { timeISOToUAFormat } from '../../helpers/timeHelper';

const { Panel } = Collapse;

const History = ({data}) => {

    const refScroll = useRef();

    useEffect(() => {
        refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }, [data]);

    return (
        <div ref={refScroll} className="history_side">
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {
                    data ?
                        data.map((item, index) =>
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