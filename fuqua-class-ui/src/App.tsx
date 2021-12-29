import React, { useEffect } from 'react';
import "./App.css";
import { LoginTextField } from "./components/common/LoginForm";
import { RegisterTextField } from "./components/common/RegisterForm";
import { Home_Student } from "./components/Home-student";
import { Home_Admin } from "./components/Home-admin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import { useState } from "react";
import { app, auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "@firebase/auth";
import { doc, setDoc, onSnapshot } from "@firebase/firestore"; 
import { useContractMethod } from "./hooks/index";

function App() {

  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [publicKey, setPubKey] = useState("");

  const [courseName, setCName] = useState("");
  const [role, setRole] = useState("");

  const { state: addInstructorState, send: addInstructor } = useContractMethod("addInstructor");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const navigator = useNavigate();

  const handleAction = (id: number) => {
    if (id === 1) {
      signInWithEmailAndPassword(auth, email, password)
        .then((response: any) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
                let userData = doc.data();
                let role = userData?.role ?? "No Role Assigned";
                if (role === "Student") {
                  navigator("./Home_Student");
                } else {
                  navigator("./Home_Admin");
                }
            });
            } else {
              // alert("There is a problem with the system");
            }
          });
        }).catch((error: any) => {
          if(error.code === 'auth/wrong-password'){
            alert("Please check the Password");
          }
          if(error.code === 'auth/user-not-found'){
            if (window.confirm('We cannot find you, make a new accout?')) {
              navigator("./register");
            } else {
              alert("Please check your email");
            }
          }
        })
    }
    if (id === 2) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (response: any) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          )
          const user = response.user;
          if (user) {
            const uid = user.uid;
            // Add data to firestore 
            setDoc(doc(db, "users", uid), {
              firstName: firstName,
              lastName: lastName,
              publicKey: publicKey,
              courseName: courseName,
              role: role
            });
            addInstructor(publicKey);
            const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
              let userData = doc.data();
              let role = userData?.role ?? "No Role Assigned";
              if (role.toLowerCase() === "student") {
                navigator("./Home_Student");
              } else {
                navigator("./Home_Admin");
              }
          });
          } else {
            // alert("There is a problem with the system");
          }
        }
      ).catch((error: any) => {
        if (error.code === 'auth/email-already-in-use') {
          alert("Email already in use");
        }
      })
    }
    if (id === 3) {
      auth.signOut();
      sessionStorage.removeItem('Auth Token');
      // alert("You are not signed in anymore");
      navigator("./");
    }
  };

  return (
      <div className="App">
        <>
          <Routes>
            <Route path="/Home_Student" element={<Home_Student handleAction={() => handleAction(3)} />} />
            <Route path="/Home_Admin" element={<Home_Admin handleAction={() => handleAction(3)} />} />
            <Route
              path="/"
              element={
                <LoginTextField
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
                <RegisterTextField
                  title="Register"
                  setFName={setFName}
                  setLName={setLName}
                  setPubKey={setPubKey}
                  setCName={setCName}
                  setRole={setRole}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(2)}
                />
              }
            />
          </Routes>
        </>
      </div>
  );
}

export default App;
