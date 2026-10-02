import React from 'react'
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Calender = () => {
    const [selected, setSelected] = useState(new Date);
  return (
    <>
        <div className="mb-2">
              <span className="text-lg font-medium text-white/90">Calender</span>
            </div>
            <div className="flex justify-center">
              <DayPicker 
                animate
                fixedWeeks
                captionLayout="label"
                showOutsideDays
                mode="single"
                selected={selected}
                onSelect={setSelected}
                navLayout="around"
                timeZone="Africa/Cairo"
                classNames={{
                  day_button:"w-9 h-9 mx-auto rounded-full text-md text-white/80 hover:bg-white/10",
                }} 
                modifiersClassNames={{
                  selected: " [&>button]:!bg-[#34117E] [&>button]:!text-white",
                  today: "font-semibold",
                  outside: "[&>button]:!text-white/20",
                  disabled: "[&>button]:!text-white/20",
                }}
              />
            </div>
    </>
  )
}

export default Calender