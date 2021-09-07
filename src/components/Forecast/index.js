import {timeISOToUAFormat} from '../../helpers/timeHelper';

// css
import './styles.css';

const Forecast = ({forecast}) => {

    return (
          <div className="forecast_content_current_next_days">
              {
                  forecast ?
                      forecast.map((item, index) => (
                          <div key={item.date + index} className="forecast_content_current_next_days_component">
                              <h3 className="date">{timeISOToUAFormat(item.date).substr(0, 10)}</h3>
                              <div>
                                  <p>Max temperature: {item.day.maxtemp_c}</p>
                                  <p>Min temperature: {item.day.mintemp_c}&#176;C</p>
                                  <p>Chance of rain: {item.day.daily_chance_of_rain}%</p>
                              </div>
                          </div>
                      ))
                      : null
              }
          </div>
    );
}

export default Forecast;