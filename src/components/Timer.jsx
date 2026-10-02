import React from 'react';
// import { useCountdownTimer } from 'use-countdown-timer';
import { useEffect, useState } from "react";

const TIME_IN_MILISECONDS_TO_COUNTDOWN = 1000*60;
const INTERVAL_IN_MILISECONDS = 1000;
const radius = 80;
const circumference = 2 * Math.PI * radius;
function Timer() {
    const [time, setTime] = useState(TIME_IN_MILISECONDS_TO_COUNTDOWN);
    const [start, setStart] = useState(false);
    
    useEffect(() => {
        if(start){
            let interval;
            const countDownUntilZero = () => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(interval);
                        return  prevTime;
                    }
                    else {
                        return prevTime - INTERVAL_IN_MILISECONDS;
                    }
                })
            }
            interval = setInterval(countDownUntilZero, INTERVAL_IN_MILISECONDS);
            return () => clearInterval(interval);
        }
    }, [start]);
    const totalTimeInSec = Math.max(0, Math.ceil(time/1000));
    const totalTimeInMin = Math.floor(totalTimeInSec/60);
    const remainingTime = totalTimeInSec % 60;

    const formattedMinutes = String(totalTimeInMin).padStart(2, '0');
    const formattedSeconds = String(remainingTime).padStart(2, '0');

    const strokeDashoffset = circumference - (circumference * (time/TIME_IN_MILISECONDS_TO_COUNTDOWN));
    
    return <>
        <span className="text-lg font-medium text-white/90">Focus Timer</span>
        <div className='relative flex items-center justify-center w-48 h-48 mx-auto mt-10'>
            {time>0 ? <h2 className='absolute text-2xl font-semibold text-white'>{formattedMinutes}:{formattedSeconds}</h2>: (<h2 className='absolute text-2xl font-semibold text-white'>{formattedMinutes}:{formattedSeconds}</h2>)} <br />
            <svg className='h-full w-full -rotate-90' viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                <circle r={radius} cx="90" cy="90" stroke="rgba(255, 255, 255, 0.2)" stroke-width="10" fill="transparent" />
                <circle strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap='round' r={radius} cx="90" cy="90" stroke="#34117E" stroke-width="10" fill="transparent" className='transition-all duration-1000 ease-linear' />
            </svg>
        </div>
        <div className="flex gap-4 items-center ml-19">
            {start ? (
                // When running: Show Pause button to stop it
                <button className='cursor-pointer' onClick={() => setStart(false)}>
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle r="20" cx="30" cy="30" stroke="#34117E" strokeWidth="10" fill="#34117E" />
                        <rect x="24" y="21" width="4" height="18" rx="1" fill="#fff" />
                        <rect x="32" y="21" width="4" height="18" rx="1" fill="#fff" />
                    </svg>
                </button>
            ) : (
                // When stopped: Show Play button to start it
                <button className='cursor-pointer' onClick={() => setStart(true)}>
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle r="20" cx="30" cy="30" stroke="#34117E" strokeWidth="10" fill="#34117E" />
                        <polygon points="40,30 25,40 25,20" fill="#fff" />
                    </svg>
                </button>
            )}
            <button className='cursor-pointer pl-7 pb-7' onClick={()=>{setStart(false);setTime(TIME_IN_MILISECONDS_TO_COUNTDOWN)}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                    <path 
                        d="M3.578 6.5A8.5 8.5 0 1 1 2.5 12" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                    />
                    <path 
                        d="M6.5 7.5L2.5 6.5L3.5 2.5" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                </svg>
            </button>
        </div>
    </>;
}
export default Timer;