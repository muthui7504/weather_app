import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Mombasa');
    const [thisLocation, setLocation] = useState('');

    // Fetch API
    const fetchWeather = async () => {
        const apiKey = import.meta.env.VITE_API_KEY;
        console.log('API Key:', apiKey); // Ensure the API key is loaded

        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: '0',
            },
            headers: {
                'X-RapidAPI-Key': '4c096d0841msh8b20dcce917b255p18fc74jsn63627fd34ddf',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
            }
        };

        try {
            console.log('Request Options:', options); // Log request options for debugging
            const response = await axios.request(options);
            console.log('API Response:', response.data); // Log the response data

            // Check API response structure
            if (response.data && response.data.locations) {
                const thisData = response.data.locations[place]; // Adjust based on API response structure
                if (thisData) {
                    setLocation(thisData.address);
                    setValues(thisData.values);
                    setWeather(thisData.values[0]);
                } else {
                    console.error('Location data not found in API response');
                    alert('Location data not found');
                }
            } else {
                console.error('Invalid API response structure', response.data);
                alert('Invalid API response structure');
            }
        } catch (e) {
            console.error('API Request Error:', e); // Log the error
            alert('This place does not exist or an error occurred');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    useEffect(() => {
        console.log('Values:', values); // Log values to ensure they are updated
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
