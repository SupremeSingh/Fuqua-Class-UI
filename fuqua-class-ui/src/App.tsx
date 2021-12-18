import React, { useEffect } from 'react';
import "./App.css";
import { BasicTextFields } from "./components/common/Form";
import { Home } from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import { useState } from "react";
import { app, auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAction = (id: number) => {
    if (id === 1) {
      signInWithEmailAndPassword(auth, email, password)
        .then((response: any) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        }).catch((error: any) => {
          if(error.code === 'auth/wrong-password'){
            alert("Please check the Password");
          }
          if(error.code === 'auth/user-not-found'){
            alert("Please check the Email");
          }
        })
    }
    if (id === 2) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (response: any) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        }
      ).catch((error: any) => {
        if (error.code === 'auth/email-already-in-use') {
          alert("Email already in use");
        }
      })
    }
    if (id === 3) {
      sessionStorage.removeItem('Auth Token');
    }
  };

  return (
    <Router>
      <div className="App">
        <>
          <Routes>
            <Route path="/home" element={<Home userName={email}  handleAction={() => handleAction(3)} />} />
            <Route
              path="/"
              element={
                <BasicTextFields
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(1)}
                />
              }
            />
            <Route
              path="/register"
              element={
                <BasicTextFields
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(2)}
                />
              }
            />
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
