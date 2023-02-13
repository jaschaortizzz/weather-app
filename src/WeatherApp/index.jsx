import React, { createRef, PureComponent } from 'react'
import SearchForm from './searchForm'
import WeatherItem from './weatherItem'
import './weatherApp.css'

export default class WeatherApp extends PureComponent {
    state = {
        weatherItem : []
    }

    searchText = createRef();

    searchLocation = async event => {
        event.preventDefault();

        const location = this.searchText.current.value

        try {
            const url = `http://localhost:3000/weatherList?location=${location}`;
            const res = await fetch(url);
            const json = await res.json();
            this.setState({ weatherItem:json });
            this.searchText.current.value = '';
        } catch (error) {
            
        }
        

    }


    render(){

        const { weatherItem } = this.state;

        return(
            <div className='weather'>
                <h1 className='weather__title'>Weather App</h1>
                <SearchForm 
                    searchLocation={this.searchLocation}
                    ref={this.searchText}
                />
                <WeatherItem
                    weatherItem={weatherItem}
                />
            </div>
        )
    }
}