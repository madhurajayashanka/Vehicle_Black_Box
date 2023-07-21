import React, { useEffect, useState } from "react";
import app from "./base.js";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <>
        <Spinner
          animation="border"
          variant="primary"
          style={{
            width: "10rem",
            height: "10rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "20%",
          }}
        />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
