import React from 'react';
// import { useCountdownTimer } from 'use-countdown-timer';
import { useEffect, useState } from "react";

const TIME_IN_MILISECONDS_TO_COUNTDOWN = 30*1000;
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

    const strokeDashoffset = circumference - (circumference * (time/TIME_IN_MILISECONDS_TO_COUNTDOWN));
    
    return <>
        <div className='relative flex items-center justify-center w-48 h-48 mx-auto'>
            {time>0 ? <h2 className='absolute text-2xl font-semibold text-white'>{(time/1000)}</h2>: (<h2 className='absolute text-2xl font-semibold text-white'>{(time/1000)}</h2>)} <br />
            <svg className='h-full w-full -rotate-90' viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                <circle r={radius} cx="90" cy="90" stroke="rgba(255, 255, 255, 0.2)" stroke-width="10" fill="transparent" />
                <circle strokeDasharray={strokeDashoffset} strokeDashoffset={circumference} strokeLinecap='round' r={radius} cx="90" cy="90" stroke="#34117E" stroke-width="10" fill="transparent" className='transition-all duration-1000 ease-linear' />
            </svg>
        </div>
        <button className='cursor-pointer' onClick={()=>setStart(true)}>Start</button>
        <button className='cursor-pointer' onClick={()=>setStart(false)}>Pause</button>
        <button className='cursor-pointer' onClick={()=>{setStart(false);setTime(TIME_IN_MILISECONDS_TO_COUNTDOWN)}}>Reset</button>

    </>;
}
export default Timer;