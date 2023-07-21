import React, { useState, useEffect } from "react";
import axios from "axios";
import app from "./base";
import "./table.css";
//import Navbar from "./navbar";
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  function convertToIST(utcTime) {
    const date = new Date(utcTime);
    const istTime = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return istTime.toUTCString();
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://api.thingspeak.com/channels/2024270/feeds.json?results=200"
      );
      setData(response.data.feeds.slice().reverse());
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2024270/feeds.json?results=200"
        );
        setData(response.data.feeds.slice().reverse());
      };
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="outer-table">
        <table className="tableSt" style={{ textAlign: "center" }}>
          <thead className="header-row">
            <tr>
              <th style={{ textAlign: "center" }} className="tableTh">
                Location
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                Date/Time
              </th>

              <th style={{ textAlign: "center" }} className="tableTh">
                Speed(km/h)
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                Vibration
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                RPM
              </th>
              <th style={{ textAlign: "center" }} className="tableTh">
                Fuel Level
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="tableTr" key={item.entry_id}>
                <td className="tableTd">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${item.field1},${item.field2}`}
                    target="_blank"
                  >
                    Location
                  </a>
                  <br />({item.field1}, {item.field2})
                </td>

                <td className="tableTd">{convertToIST(item.created_at)}</td>

                <td className="tableTd">{item.field5}</td>
                <td className="tableTd">{item.field6}</td>
                <td className="tableTd">{item.field7}</td>
                <td className="tableTd">{item.field8}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
