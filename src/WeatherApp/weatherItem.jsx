import React, { memo } from 'react'
import PropTypes from 'prop-types'

function WeatherItem({
    weatherItem,
}) {
    return(
        <div>
            {weatherItem.map(item => (
                    <div> 
                        <div key={item.id} className='weather-show'>
                        <h5 className='weather-show__location'>{item.location}</h5>
                        <span className='weather-show__weather'>{item.weather}</span>
                        <span className='weather-show__weather'>{`${item.temperature} Degree Celsius`}</span>
                        </div> 
                           
                   </div>
                ))}
        </div>
    )
}

WeatherItem.propTypes = {
    // eslint-disable-next-line react/require-default-props
    weatherItem: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number,
            location: PropTypes.string,
            weather: PropTypes.string,
            temperature: PropTypes.number
        }).isRequired
    )
}

export default memo(WeatherItem);