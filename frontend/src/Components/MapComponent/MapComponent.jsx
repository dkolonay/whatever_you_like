import "./MapComponent.css";
import carIcon from "../../assets/car.png";
import CarPin from "../CarPin/CarPin";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

const MapComponent = ({ setShowSidebar, setPotentialParkData }) => {
  const [newMarker, setNewMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const map = useMap();

  function smoothPanAndZoom(map, targetLatLng, targetZoom, duration) {
    const startLatLng = map.getCenter();
    const startingLat = startLatLng.lat()
    const startingLng = startLatLng.lng()
    const startZoom = map.getZoom();
    const startTime = performance.now();

    function animate() {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Interpolate latitude, longitude, and zoom
      const currentLat =
        startLatLng.lat() + (targetLatLng.lat - startLatLng.lat()) * progress;
      const currentLng =
        startLatLng.lng() + (targetLatLng.lng - startLatLng.lng()) * progress;
      const currentZoom = startZoom + (targetZoom - startZoom) * progress;

      map.moveCamera({
        center: {lat: currentLat, lng: currentLng},
        zoom: currentZoom
      })
      // map.setCenter(new google.maps.LatLng(currentLat, currentLng));
      // map.setZoom(currentZoom);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    if (!map) {
      return;
    }
    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };
    const successCallback = (position) => {
      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      if (position.coords.accuracy < 200) {
        setUserLocation(currentLocation);
        map.panTo(currentLocation);
        map.setZoom(17);
      }
    };

    const errorCallback = (error) => {
      console.error("Error getting user location:", error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    setMapLoading(false);
  }, [map]);

  const handleMapClick = (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    const clickPosition = { lat, lng };
    setNewMarker(clickPosition);
    smoothPanAndZoom(map, clickPosition, 17, 700);

    setPotentialParkData(clickPosition);
    setShowSidebar(true);
  };

  return (
    <Map
      style={{ width: "100vw", height: "calc(100vh - 70px)" }}
      defaultCenter={{ lat: 40.739691, lng: -73.950848 }}
      defaultZoom={13}
      options={{
        gestureHandling: "greedy",
        draggableCursor: "pointer",
      }}
      disableDefaultUI
      onClick={handleMapClick}
      mapId={"adb4347623e9a8d3e95db32d"}
    >
      {newMarker && (
        <AdvancedMarker
          onClick={() => {
            setShowSidebar(true);
          }}
          position={newMarker}
        >
          <CarPin />
        </AdvancedMarker>
      )}
      {userLocation && <AdvancedMarker position={userLocation} />}
    </Map>
  );
};

export default MapComponent;
