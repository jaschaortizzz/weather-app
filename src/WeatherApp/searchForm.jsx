import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'

const WeatherForm = forwardRef(({ searchLocation }, ref ) => (
        <div>
            <form
                onSubmit={searchLocation}
                className='weather-search-form'
            >
                <div
                    className='weather-search-form__search-form-container'
                >
                    <input 
                        ref={ref}
                        className='weather-search-form__input'
                        placeholder='Location'
                     />
                    <button
                        className='weather-search-form__btn'
                    >Search</button>
                </div>
            </form>
        </div>
    ));

WeatherForm.PropTypes = {
    searchLocation: PropTypes.func.isRequired
}


export default memo(WeatherForm);