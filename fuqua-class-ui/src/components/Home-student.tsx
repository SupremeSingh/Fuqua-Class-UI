import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { BasicButtons } from "./common/Button-FBase";
import { MetaMaskButtons } from "./common/Button-MM";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

type CardProps = {
  handleAction: any;
};

export const Home_Student: FunctionComponent<CardProps> = ({
  handleAction,
}) => {

  const auth = getAuth();
  let firstName: string;
  let publicKey: any; 

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        let userData = doc.data();
        firstName = userData?.firstName ?? "No First Name";
        publicKey = userData?.publicKey ?? "No Public Key";

    });
    } else {
      alert("User not signed in");
      console.log("You are not signed in anymore");
    }
  });

  return (
    <div>
      <div className="heading-container">
        <h3>Hello Student</h3>
      </div>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>
      <MetaMaskButtons title="Connect Metamask" />
      <br />
      <br />
      <BasicButtons title="Log Out" handleAction={handleAction} />
    </div>
  );
};
