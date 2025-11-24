import { APIProvider } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import MapComponent from "../Components/MapComponent/MapComponent";
import InfoSidebar from "../Components/InfoSidebar/InfoSidebar";
import axios from "axios";
import "./Home.css";

const KEY = import.meta.env.VITE_MAPS_API_KEY;

const Home = ({ auth }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [potentialParkData, setPotentialParkData] = useState(null)
  const [addressData, setAddressData] = useState(null)

  const confirmPark = ()=>{
    console.log(`Park at ${potentialParkData.lat}, ${potentialParkData.lng}`)
  }

    useEffect(()=>{
      if(potentialParkData){
        (async ()=>{
      try{
        const response = await axios.get(`api/map/address-from-coords/${potentialParkData.lat},${potentialParkData.lng}`);
        setAddressData(response.data)
      } catch(err){
        console.error(err);
      }
    })();
      }
    
  }, [potentialParkData])

  return (
    <div className={"page-container"}>
      <Navbar auth={auth} />
      <InfoSidebar show={showSidebar} closeSidebar={()=>{setShowSidebar(false)}} addressData={addressData} confirmPark={confirmPark}/>
      <APIProvider apiKey={KEY}>
        <MapComponent setShowSidebar={setShowSidebar} setPotentialParkData={setPotentialParkData}/>
      </APIProvider>
    </div>
  );
};

export default Home;
