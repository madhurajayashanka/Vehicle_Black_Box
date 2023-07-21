import React, { useCallback, useContext, useState } from "react";
import { Routes, Route, useHistory } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import app from "../../base.js";
import { AuthContext } from "../../Auth";
import Alert from "react-bootstrap/Alert";
import "./LoginForm.css";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
} from "reactstrap";

function LoginForm() {
  const [displayError, setDisplayError] = useState();
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmitted = useCallback(async (event) => {
    event.preventDefault();
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      navigate.push("/");
    } catch (error) {
      setDisplayError("Wrong password or email");
    }
  });
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  const navigateToSignup = () => {
    navigate.push("/signup");
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
                src="https://i.ibb.co/2F11P8p/oie-QTu-Sjd-DFTel-W.jpg"
                alt="mobile-App"
              />
            </div>
            <div className="col login-form">
              <form onSubmit={handleFormSubmitted}>
                <h2 className="font-weight-bold mb-4">Login</h2>
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
                <Button className="mt-3  btn">Login</Button>

                <div style={{ textAlign: "center", marginTop: "2vh" }}>
                  <a className="mt-3 " href="#" onClick={navigateToSignup}>
                    Create an account
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

export default LoginForm;
