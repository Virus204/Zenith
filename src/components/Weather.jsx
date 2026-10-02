import React from 'react'
import { useEffect, useState } from "react";
import { FadeArc } from "@/components/ui/fade-arc";

function getWeatherCondition(code) {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  return "Stormy";
}

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
      
    useEffect(() => {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=30.0626&longitude=31.2497&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Africa/Cairo";
    fetch(url).then(response => response.json()).then(data => {setWeatherData(data);})
    .catch(error => console.error("Error fetching weather:", error));
    }, [])
    
  return (
    <div className="flex items-center flex-col justify-center w-full min-h-[200px]">
        {weatherData ?(
            <>
            <div>
                <img src="weather-icon.svg" className="mb-10"></img>
                <h2 className="text-7xl font-light text-white flex justify-center items-start">
                {Math.round(weatherData.current.temperature_2m)}<span className="text-4xl mt-1">°</span>
                </h2>
            </div>
            <div className="text-white/80 text-md mb-4 mt-4">
                {getWeatherCondition(weatherData.current.weather_code)}
            </div>
            <div className="flex items-center gap-4 text-md text-white/90 mb-6">
                <span className="flex items-center gap-1">
                <span className="text-white/50 text-xs">↑</span> 
                {Math.round(weatherData.daily.temperature_2m_max[0])}°
                </span>
                <span className="text-gray-600">|</span>
                <span className="flex items-center gap-1">
                <span className="text-white/50 text-xs">↓</span> 
                {Math.round(weatherData.daily.temperature_2m_min[0])}°
                </span>
            </div>
            <div className="w-50 pt-4 flex justify-between px-2">
                {/* We map through index 1, 2, and 3 (Tomorrow, Day 2, Day 3) */}
                {[1, 2, 3].map((dayIndex) => {
                // Convert the API date string to a short weekday (e.g., "Wed")
                const date = new Date(weatherData.daily.time[dayIndex]);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

                return (
                    <div key={dayIndex} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-white/70">{dayName}</span>
                    {/* You can reuse your icon here or map different icons based on weatherData.daily.weather_code[dayIndex] */}
                    <img src="weather-icon.svg" className="w-6 h-6" alt="forecast" />
                    <span className="text-sm font-medium">
                        {Math.round(weatherData.daily.temperature_2m_max[dayIndex])}°
                    </span>
                    </div>
                );
                })}
            </div>
            </>
        ):(
            <FadeArc className="size-20 text-[#34117E]"/>
        )}
    </div>
  )
}

export default Weather