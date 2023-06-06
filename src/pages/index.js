import React, { useState, useEffect } from "react";
import { Rubik } from "next/font/google";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
const rubik = Rubik({ subsets: ["latin"] });
import dynamic from "next/dynamic";

const MapWithNoSSR = React.useMemo(() => {
  dynamic(() => import("../Map"), {
    ssr: false,
  });
});
export default function Home() {
  const [ipInfos, setIpInfos] = useState();
  console.log("ipInfos: ", ipInfos);
  const [ipNumber, setIpNumber] = useState("176.234.93.82");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=at_tkHVmOnOesDjvK7OMsqRGL4JFAyX2&ipAddress=${ipNumber}`
      );
      const data = await response.json();
      setIpInfos(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    fetchData();
  };
  const inputChangeHandler = (event) => {
    setIpNumber(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main
      className={`container mx-auto grid grid-rows-[300px_100vh] ${rubik.className}`}
    >
      <div className="bg-repeat bg-[url('./../../public/pattern-bg-desktop.png')] flex flex-col items-center space-y-10 relative">
        <div className="mt-10 text-white text-3xl font-medium">
          IP Address Tracker
        </div>
        <form onSubmit={onSubmitHandler}>
          <div>
            <input
              className="h-14 rounded-l-2xl w-[500px] p-4"
              type="text"
              placeholder="Search any IP adress or domain"
              onChange={(e) => inputChangeHandler(e)}
            />
            <button
              type="submit"
              className="h-14 rounded-r-2xl w-[100px] p-4 bg-black text-white"
            >
              ARA
            </button>
          </div>
        </form>
        <div className="flex absolute bg-white h-[160px] w-[1100px] rounded-2xl top-[180px] shadow-2xl divide-x-2">
          <div className="basis-1/4 my-10 px-10">
            <div className="mb-2 text-xs text-gray-400">IP ADRESS</div>
            <div className="text-xl line-clamp-2">{ipInfos?.ip}</div>
          </div>
          <div className="basis-1/4 my-10 px-10">
            <div className="mb-2 text-xs text-gray-400">LOCATION</div>
            <div className="text-xl line-clamp-3">
              {ipInfos?.location.region}, {ipInfos?.location.country}
            </div>
          </div>
          <div className="basis-1/4 my-10 px-10">
            <div className="mb-2 text-xs text-gray-400">TIMEZONE</div>
            <div className="text-xl line-clamp-2">
              {ipInfos?.location.timezone}
            </div>
          </div>
          <div className="basis-1/4 my-10 px-10">
            <div className="mb-2 text-xs text-gray-400">ISP</div>
            <div className="text-xl line-clamp-2">{ipInfos?.isp}</div>
          </div>
        </div>
      </div>
      <div className="h-[100vh]">
        <MapWithNoSSR />
      </div>
    </main>
  );
}
