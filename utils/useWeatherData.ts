import { useState, useEffect } from "react";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const apiKey = "fec85dc31e929b985200f2d8d180e767";
        const city = "Mexico City";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error al obtener datos meteorológicos", error);
      }
    };

    // Obtener datos meteorológicos inicialmente
    getWeatherData();

    // Configurar un intervalo para actualizar los datos cada 2 minutos
    const intervalId = setInterval(getWeatherData, 120000); // Actualizar cada 2 minutos

    // Limpieza al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return weatherData;
};

export default useWeatherData;
