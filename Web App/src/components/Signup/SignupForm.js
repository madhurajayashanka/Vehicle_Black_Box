import React, { useCallback, useContext, useState } from "react";
import { Routes, Route, useHistory } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import app from "../../base.js";
import { AuthContext } from "../../Auth";
import Alert from "react-bootstrap/Alert";
import "../Login/LoginForm.css";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
} from "reactstrap";

function SignupForm() {
  const [displayError, setDisplayError] = useState();
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmitted = useCallback(async (event) => {
    event.preventDefault();
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      navigate.push("/");
    } catch (error) {
      setDisplayError(JSON.stringify(error["message"]));
    }
  });
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  const navigateToLogin = () => {
    navigate.push("/login");
  };

  return (
    <div className="background">
      <div className="login-box">
        <div className="container">
          <div className="row app-des">
            <div
              style={{ textAlign: "center" }}
              className="col left-background "
            >
              <img className="brandLogo" src={require("../NavBar/brand.jpg")} />
              <h2>Car BlackBox</h2>
              <p>Everything Records here!</p>
              <CardImg
                style={{ borderRadius: "20px" }}
                className="mobile-img"
                src="https://static1.squarespace.com/static/56537f8fe4b0eb26e63322da/5653811be4b0d39ff6a85677/606799625899b6066d7926bf/1636411670241/How-can-i-secretly-track-my-car-by-car-audio-city-san-diego.jpg?format=1500w"
                alt="mobile-App"
              />
            </div>
            <div className="col login-form">
              <form onSubmit={handleFormSubmitted}>
                <h2 className="font-weight-bold mb-4">Create an account</h2>
                <FormGroup>
                  <Label className="font-weight-bold mb-2">Email</Label>
                  <Input
                    className="mb-3"
                    type="email"
                    placeholder="John@gmail.com"
                    value={email}
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Label className="font-weight-bold mb-2">Password</Label>
                  <Input
                    className="mb-3"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormGroup>
                <Button className="mt-3  btn">Sign up</Button>

                <div style={{ textAlign: "center", marginTop: "2vh" }}>
                  <a className="mt-3 " href="#" onClick={navigateToLogin}>
                    Already have an account
                  </a>
                </div>

                {displayError ? (
                  <Alert variant="danger">{displayError}</Alert>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
