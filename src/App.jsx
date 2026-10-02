import { useEffect, useState } from "react";
import GradientBackground from './components/GradientBackground'
import Timer from "./components/Timer";
import Calender from "./components/Calender";
import Weather from "./components/Weather";

function App() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <GradientBackground />
        <div className="p-20 flex">
          <div className="text-white/80 backdrop-blur-sm bg-black/10 border border-white/20 shadow-xl w-90 rounded-xl p-6">
            <Calender />
          </div>
          <div className="backdrop-blur-sm border border-white/20 bg-black/10 text-white/80 shadow-xl w-70 rounded-xl p-8 ml-10">
            <Weather />
          </div>
          <div className="backdrop-blur-sm border border-white/20 bg-black/10 text-white/80 shadow-xl w-200 rounded-xl p-6 ml-10">
            <div>
              <span className="text-lg font-medium text-white/90">My Tasks</span>
            </div>
          </div>
          <div className="backdrop-blur-sm border border-white/20 bg-black/10 text-white/80 shadow-xl w-70 rounded-xl p-6 ml-10">
            <div>
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App