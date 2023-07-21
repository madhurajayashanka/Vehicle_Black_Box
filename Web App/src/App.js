import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
import Map from "./components/Map/Map";
import ChartComponent from "./components/Charts/Charts";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/map" component={Map} />
        <PrivateRoute exact path="/charts" component={ChartComponent} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
