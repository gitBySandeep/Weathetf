import { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import './weather.css';
import axios from 'axios'


export default function Wheather() {
    // const [image,setImage] = useState("")
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("indore");
    const [dateTime, setDateTime] = useState(new Date());

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Months are 0-based
    const day = dateTime.getDate();

    const [lat, setLat] = useState(null); // Latitude
    const [lon, setLon] = useState(null); // Longitude

    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=66766eb4593dce5fda011c772840f994`,)
            .then((res => {
                // console.log(res.data);
                setCity(res.data);
                setDateTime(new Date());
                setLat(res.data.coord.lat);
                setLon(res.data.coord.lon);

            })).catch(err => {
                console.log(err);
            })
    }, [search])

    const key = '66766eb4593dce5fda011c772840f994';

    useEffect(() => {
        if (lat && lon) {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                .then(response => {
                    // console.log(response.data.list); // Log the response for debugging
                    setForecast(response.data.list); // Set the daily forecast data
                    setError(null); // Reset error on successful fetch
                })
                .catch(err => {
                    setError('Failed to fetch forecast'); // Set error message if forecast fetch fails
                    console.error(err);
                });
        }
    }, [lat, lon]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=66766eb4593dce5fda011c772840f994`,)
                const weatherData = response.data;
                console.log(weatherData);

                if (weatherData.main.temp > 100) {
                    setAlert('Extreme Heat Warning!');
                } else if (weatherData.main.temp < 32) {
                    setAlert('Extreme Cold Warning!');
                } else if (weatherData.weather.some(w => w.main === 'Rain' && w.description.includes('heavy'))) {
                    setAlert('Heavy Rain Warning!');
                } else if (weatherData.weather.main == "Rain") {
                    setAlert('Rain Warning!');
                } else if (weatherData.wather.main == "Haze") {
                    setAlert('Haze warning');//dhund
                } else if (weatherData.wind.speed > 25) {
                    setAlert('Storm Warning!');
                } else {
                    setAlert(null);
                }
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        };

        // Fetch weather data on component mount and periodically
        fetchWeatherData();
        const interval = setInterval(fetchWeatherData, 10000); // 10 minutes
        return () => clearInterval(interval);
    }, []);


    const getWeatherDescription = (weatherMain) => {
        if (weatherMain === "Clouds") {
            // setImage("./Img/cloud-29.webp");
            return "Cloudy weather";
        } else if (weatherMain === "Rain") {
            // setImage("./Img/cloud-29.webp");
            return "Rainy weather";
        } else if (weatherMain === "Clear") {
            return "Clear weather";
        } else if (weatherMain === "Drizzle") {
            return "Drizzle weather";
        } else if (weatherMain === "Mist") {
            return "Mist weather";
        } else {
            return "Weather not available";
        }
    };

    const handleSearch = (e) => {
        if (e.target.value) {
            setSearch(e.target.value);
        } else {
            setSearch("Indore")
        }
    }

    return <>
        <div id='parentbox' className="d-flex justify-content-center align-items-center" style={{ backgroundImage: `url("/Img/blue.jpg")`, height: "100vh", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
            <div className='box p-3 shadow-sm rounded' style={{ width: "100%", maxWidth: "1200px" }}>
                <h1 className="boxfirst mb-1 text-center">Welcome to the Weather Application</h1>
                <h4 className="text-end fw-bold mb-4">{day}/{month}/{year}</h4>
                <div className="alert alert-danger p-2 d-flex flex-wrap" style={{height:"6vh", width:"17%", borderRadius:"10px"}} role="alert">
                    {alert}
                </div>
                <div className=' mb-2 '>
                    <label className="fs-4 fw-bold text-dark">Search weather location</label>
                    <input type="search" className="form-control custom-input" id="inputsearch" onChange={handleSearch} />
                </div>
                {!city ? (
                    <p className='text-center'>Weather data not found for the specified location.</p>
                ) : (
                    <>
                        <div className="d-flex flex-column align-items-center ">
                            <div className="d-flex align-items-center mb-2  mb-md-0">
                                <h2><IoLocation /></h2>
                                <h2 ><span className="fw-bold fs-4">{search}</span></h2>
                            </div>
                            <div className="d-flex flex-column align-items-center mb-1 mb-md-0">
                                {/* <img src="./Img/cloud-png-image-from-pngfre-4.png" className="mb-1" style={{ height: "50px", width: "70px" }} alt="Temperature Icon" /> */}
                                <h2 className=' fs-1 fw-bold text-center '>{city?.main.temp}<span className="fs-5" style={{ position: "absolute" }}>&deg;C</span></h2>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap justify-content-between align-items-center p-3 rounded'>
                            <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                                <img src="./Img/cloud-29.webp" className="mb-2" style={{ width: "70px" }} alt="Humidity Icon" />
                                <h2 className='fw-bold fs-5 text-center'>Humidity: {city?.main.humidity}%</h2>
                            </div>

                            <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                                <img src="./Img/cloud-29.webp" className="mb-2" style={{ width: "70px" }} alt="Pressure Icon" />
                                <h6 className='fw-bold fs-5 text-center'>Pressure: {city?.main.pressure} Mb</h6>
                            </div>

                            <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
                                <img src="./Img/cloud-29.webp" className="mb-2" style={{ width: "70px" }} alt="Wind Icon" />
                                <h2 className='fw-bold fs-5 text-center'>Wind: {city?.wind.speed} km/h</h2>
                            </div>

                            <div className="d-flex flex-column align-items-center">
                                <h2 className='fw-bold fs-5 mt-2'>Weather</h2>
                                <h4 className='fw-bold fs-5'>{getWeatherDescription(city.weather[0].main)}</h4>
                            </div>
                        </div>

                        <div className="mt-4 mb-4">
                            <h3 className="fw-bold fs-4 text-center">6-Day Weather Forecast</h3>
                        </div>

                        {/* Forecast Data */}
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Temperature</th>
                                        <th>Wind</th>
                                        <th>Pressure</th>
                                        <th>Humidity</th>
                                        <th>Weather</th>
                                        <th>Rain chances</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {forecast ? (
                                        forecast.slice(0, 40).map((item, index) => {
                                            if (index % 7 === 0) {
                                                return (
                                                    <tr key={index}>
                                                        <td>{new Date(item.dt * 1000).toDateString()}</td>
                                                        <td>{item.main.temp}°C</td>
                                                        <td>{item.wind.speed} km/h</td>
                                                        <td>{item.main.pressure} Mb</td>
                                                        <td>{item.main.humidity}%</td>
                                                        <td>{getWeatherDescription(item.weather[0].main)}</td>
                                                        <td>{item.rain ? `${(item.rain?.['3h'] * 10).toFixed(2)}%` : "-"}</td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        }).filter(item => item !== null) // Remove null values from the result
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">Loading forecast...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

            </div>
        </div>
    </>
}