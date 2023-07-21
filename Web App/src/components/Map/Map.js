import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

function Map(props) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2024270/feeds.json?results=200"
        );
        const data = response.data.feeds.map((feed) => ({
          latitude: parseFloat(feed.field1),
          longitude: parseFloat(feed.field2),
          time: feed.field3,
          date: feed.field4,
        }));
        setLocations(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      console.log(locations);
      const lastLocation = locations[locations.length - 1];
      const map = L.map("map").setView(
        [lastLocation.latitude, lastLocation.longitude],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data © OpenStreetMap contributors",
      }).addTo(map);
      const path = L.polyline(
        locations.map((location) => [location.latitude, location.longitude]),
        { color: "red", dashArray: "5,10" }
      ).addTo(map);
      const latestLocation = L.marker(
        [lastLocation.latitude, lastLocation.longitude],
        {
          icon: L.icon({
            iconUrl:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        }
      ).addTo(map);
      const dots = locations.map((location, index) =>
        L.circleMarker([location.latitude, location.longitude], {
          radius: index === locations.length - 1 ? 7 : 5,
          fillColor: index === locations.length - 1 ? "red" : "blue",
          color: "white",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        })
      );
      const dotsLayer = L.layerGroup(dots).addTo(map);
      return () => {
        map.remove();
        path.remove();
        latestLocation.remove();
        dotsLayer.remove();
      };
    }
  }, [locations]);

  return (
    <>
      <NavBar />
      <div id="map" style={{ height: "92.7vh" }}></div>
    </>
  );
}

export default Map;
