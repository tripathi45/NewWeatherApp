import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import HourlyComp from "./HourlyComp";
import "../index.css";
import SearchBar from "./SearchBar";
import WeeklyComponent from "./WeeklyComponent";
import { CiTempHigh } from "react-icons/ci";
import { TbUvIndex } from "react-icons/tb";
import { IoWaterOutline } from "react-icons/io5";
import { FiWind } from "react-icons/fi";

const Wether = () => {
  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [currentValue, setCurrentValue] = useState([]);
  function convertToHHMM(numericTime) {
    const hours = Math.floor(numericTime / 100);
    const minutes = numericTime % 100;
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const formattedHours = String(adjustedHours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
  // const [rainValue , setRainValue] = useState([])
  const fetchData = async (query) => {
    let url = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=15efaaece1974456b33141606230312&q=${query},india&num_of_days=7&tp=3&format=json`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData)
    setWeather(parsedData.data.request[0]);
    setTime(parsedData.data.weather[1].hourly);
    setWeekData(parsedData.data.weather);
    setCurrentValue(parsedData.data.current_condition[0]);
  };
  const handleSearch = (query) => {
    fetchData(query);
  };
  useEffect(() => {
    fetchData("delhi , india");
  }, []);
  // console.log(currentValue);
  // console.log(weather);
  return (
    <>
      <div className="weather-container">
        <NavBar />
        <div className="weather-inner-cont">
          <SearchBar onSearch={handleSearch} />
          <div className="weather-query-profile">
            <div>
              <p className="city-name">{weather.query}</p>
              <p className="city-rain-chance">
                Chance Of Rain :
                {time[4] && time[4].chanceofrain !== undefined ? (
                  <span> {time[4].chanceofrain} %</span>
                ) : (
                  <span>No data available</span>
                )}
              </p>

              <p className="city-temp">{currentValue.temp_C}°C</p>
            </div>
            <div>
              {currentValue.weatherDesc &&
                currentValue.weatherDesc.length > 0 && (
                  <>
                    <img
                      className="main-city-image"
                      src={currentValue.weatherIconUrl[0].value}
                      alt=""
                    />
                  </>
                )}
            </div>
            
            {/* {console.log(currentValue)} */}
          </div>
          <div className="Hourly-comp-outer">
            {time.map((e, index) => (
              <div key={index} className="hourly-comp-inner">
                <HourlyComp
                  time={convertToHHMM(e.time)}
                  iconurl={e.weatherIconUrl[0].value}
                  temp={e.tempC}
                />
              </div>
            ))}
          </div>
          <div className="my-city-profile">
            <h3 style={{ textAlign: "center" }}>AIR CONDITION</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <div>
                <div>
                  <p className="air-condition-wrapper">
                    <CiTempHigh />
                    Real Feel
                  </p>
                  <p className="air-condition-temp">
                    {currentValue.FeelsLikeC}°C
                  </p>
                </div>
                <div>
                  <p className="air-condition-wrapper">
                    <IoWaterOutline />
                    Chance of Rain
                  </p>
                  {time[4] && time[4].chanceofrain !== undefined ? (
                    <p className="air-condition-temp">
                      {time[4].chanceofrain}%
                    </p>
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
              </div>
              <div>
                <div >
                  <p className="air-condition-wrapper">
                    <FiWind />
                    Wind Speed
                  </p>
                  <p className="air-condition-temp">
                    {currentValue.windspeedKmph}Km/hr
                  </p>
                </div>
                <div>
                  <p className="air-condition-wrapper" >
                    <TbUvIndex />
                    UV Index
                  </p>
                  <p className="air-condition-temp" style={{}}>
                    {currentValue.uvIndex}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="week-component">
        <p>7-DAY FORCAST</p>
          {/* {console.log(weekData)} */}
          {weekData.map((e, index) => {
            const d = new Date(weekData[index].date);
            const dayOfWeek = d.getDay();
            const dayNames = [
              "SUN",
              "MON",
              "TUE",
              "WED",
              "THU",
              "FRI",
              "SAT",
            ];
            return (
              <div key={index}>
                {/* {console.log(weekData)} */}
                <WeeklyComponent
                  FutureDates={dayNames[dayOfWeek]}
                  WeatherVal={weekData[index].hourly[4].weatherDesc[0].value}
                  ImageIconUrl={
                    weekData[index].hourly[4].weatherIconUrl[0].value
                  }
                  MaxTemp={weekData[index].maxtempC}
                  MinTemp={weekData[index].mintempC}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Wether;
