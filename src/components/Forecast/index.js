import {useEffect} from "react";

const Forecast = ({forecast}) => {

    useEffect(() => {
        console.log(forecast)
    });

    return (
      <div>
            <h1>Forecast</h1>
      </div>
    );
}

export default Forecast;