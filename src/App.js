import React,{ useState } from 'react';

function WeatherApp() {
    const [cityname, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState();

    const handleCityName = (event) => {
        setCityName(event.target.value);
    }
    
    const getWeatherData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=7bf0ebd091ab052802bdb2ee70aaee45`;
      try{
        const response = await fetch(url);
        const data = await response.json();
        if(data.cod === 200){
          setWeatherData(data);
          console.log(weatherData);
        }
        else if(data.cod === "404") {
          setWeatherData(data);
          console.log(weatherData);
        }
      } catch (error) {
        setWeatherData(null);
        console.log(weatherData);
        console.error('Err...:', error);
      }
    };

    const handleKeyPress = (event) => {
      if(event.key === "Enter"){
        getWeatherData();
      }
    }

  return (
    <div
      className='App'
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <input
      type='text'
      placeholder='도시를 입력하세요'
      value={cityname}
      onChange={handleCityName}
      onKeyDown={handleKeyPress}
      style={{
        width: "13vw",
        height: "3vw",
        border: "solid",
        borderRadius: "17px",
        paddingLeft: "20px"
      }}
      />
      {weatherData ? (
        <div
          style={{
            width: "15%",
            height: "230px",
            border: "3px solid",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            boxSizing: "border-box",
            marginTop: "70px"
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              fontSize: "30px"
            }}
          >
            {weatherData.name}
          </div>
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
              fontSize: "75px",
            }}
          >
            {Math.round((weatherData.main.temp - 273.15) * 10) / 10}°C
          </div>
          <br />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              fontSize: "23px",
            }}
          >
            {weatherData.weather[0].main}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WeatherApp;