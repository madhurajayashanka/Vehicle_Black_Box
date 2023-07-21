import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Charts.css";

const ChartComponent = ({ chartUrl }) => {
  return (
    <div className="chart-container">
      <iframe src={chartUrl} title="Chart" width="100%" height="400"></iframe>
    </div>
  );
};

const Charts = () => {
  return (
    <div className="">
      <NavBar />
      <h1>Vehicle Information Graphs</h1>
      <div className="charts-wrapper">
        <div className="charts-container">
          <ChartComponent chartUrl="https://thingspeak.com/channels/2024270/charts/5?bgcolor=%23F2F4F4&color=%23ea5545&dynamic=true&results=50&title=Speed&type=line&xaxis=Date&yaxis=Speed+of+Vehicle" />
          <ChartComponent chartUrl="https://thingspeak.com/channels/2024270/charts/6?bgcolor=%23F2F4F4&color=%23ea5545&dynamic=true&results=50&title=Vibration&type=line&xaxis=Time&yaxis=Vibration+Level" />
        </div>
        <div className="charts-container">
          <ChartComponent chartUrl="https://thingspeak.com/channels/2024270/charts/7?bgcolor=%23F2F4F4&color=%23ea5545&dynamic=true&results=50&title=RPM&type=line&xaxis=Time&yaxis=RPM+Level" />
          <ChartComponent chartUrl="https://thingspeak.com/channels/2024270/charts/8?bgcolor=%23F2F4F4&color=%23ea5545&dynamic=true&results=50&title=Fuel&type=line&xaxis=Time&yaxis=Fuel+Level" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
