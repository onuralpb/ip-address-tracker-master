/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import "@fontsource-variable/rubik";
import { ReactComponent as IconArrow } from "./../public/icon-arrow.svg";
import MapLeaflet from "./mapLeaflet";

function App() {
  const [ipInfos, setIpInfos] = useState();
  const [ipNumber, setIpNumber] = useState("176.234.93.82");
  const inputSearch = useRef();

  const fetchData = async () => {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_1eUUuYV6KI6y168OZtcktzu982kyN&ipAddress=${ipNumber}`
    );
    if (response.ok) {
      const data = await response.json();
      setIpInfos(data);
    } else {
      console.log(inputSearch);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    fetchData();
    inputSearch.current.value = "";
  };

  const inputChangeHandler = (event) => {
    setIpNumber(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="container mx-auto grid grid-rows-[280px_max-content]">
      <div className="bg-repeat bg-[url('/pattern-bg-desktop.png')] flex flex-col md:items-center md:space-y-8 space-y-4 relative z-40">
        <div className="md:mt-7 mt-4 text-white md:text-3xl text-2xl font-medium text-center">
          IP Address Tracker
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="flex mr-5 ml-5">
            <input
              className="h-14 rounded-l-2xl md:w-[500px] w-full p-4"
              type="text"
              placeholder="Search any IP adress or domain"
              onChange={(e) => inputChangeHandler(e)}
              ref={inputSearch}
            />
            <button
              type="submit"
              className="h-14 rounded-r-2xl bg-black text-white w-[60px] flex justify-center items-center"
            >
              <IconArrow />
            </button>
          </div>
        </form>
        <div className="flex md:flex-row flex-col absolute max-[768px]:left-5 max-[768px]:right-5 bg-white md:h-[160px] xl:w-[1100px] lg:w-[900px] md:w-[650px] max-w-full rounded-2xl md:top-[170px] top-[130px] shadow-2xl md:divide-x-2 z-40 md:py-0 pb-4">
          <div className="basis-1/4 md:my-10 mt-4 xl:px-10 px-5">
            <div className="md:mb-2 mb-0 md:text-sm text-xs font-medium text-[#c5bfbf] md:text-left text-center">
              IP ADRESS
            </div>
            <div className="lg:text-xl text-lg md:line-clamp-3 line-clamp-1 font-medium md:text-left text-center">
              {ipInfos?.ip}
            </div>
          </div>
          <div className="basis-1/4 md:my-10 mt-4 xl:px-10 px-5">
            <div className="md:mb-2 mb-0 md:text-sm text-xs font-medium text-[#c5bfbf] md:text-left text-center">
              LOCATION
            </div>
            <div className="lg:text-xl text-lg md:line-clamp-3 line-clamp-1 font-medium md:text-left text-center">
              {ipInfos &&
                `${ipInfos?.location.region}, ${ipInfos?.location.country}`}
            </div>
          </div>
          <div className="basis-1/4 md:my-10 mt-4 xl:px-10 px-5">
            <div className="md:mb-2 mb-0 md:text-sm text-xs font-medium text-[#c5bfbf] md:text-left text-center">
              TIMEZONE
            </div>
            <div className="lg:text-xl text-lg md:line-clamp-3 line-clamp-1 font-medium md:text-left text-center">
              {ipInfos?.location.timezone}
            </div>
          </div>
          <div className="basis-1/4 md:my-10 mt-4 xl:px-10 px-5">
            <div className="md:mb-2 mb-0 md:text-sm text-xs font-medium text-[#c5bfbf] md:text-left text-center">
              ISP
            </div>
            <div className="lg:text-xl text-lg md:line-clamp-3 line-clamp-1 font-medium md:text-left text-center">
              {ipInfos?.isp}
            </div>
          </div>
        </div>
      </div>
      <div>
        {ipInfos && (
          <MapLeaflet
            center={[ipInfos?.location.lat + 0.7, ipInfos?.location.lng]}
            position={[ipInfos?.location.lat, ipInfos?.location.lng]}
            zoom={7}
            region={ipInfos?.location.region}
          />
        )}
      </div>
    </main>
  );
}

export default App;
