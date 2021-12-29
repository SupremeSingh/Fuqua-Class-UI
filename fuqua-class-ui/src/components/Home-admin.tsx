import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { BasicButtons } from "./common/Button-FBase";
import { MetaMaskButtons } from "./common/Button-MM";
import { SendButtons } from "./common/Button-SendMoney";
import { Roster } from "./common/Roster";


import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  collection,
  query,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { db } from "../firebase";

type CardProps = {
  handleAction: any;
};

export const Home_Admin: FunctionComponent<CardProps> = ({ handleAction }) => {
  const auth = getAuth();
  let firstName: string;
  let publicKey: any;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        let userData = doc.data();
        firstName = userData?.firstName ?? "No First Name";
        publicKey = userData?.publicKey ?? "No Public Key";
      });
    } else {
      // alert("User not signed in");
      console.log("User not signed in");
    }
  });

  return (
    <div>
      <div className="heading-container">
        <h3>Welcome, Instructor</h3>
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

      <Roster />  

      <br />
      <br />

      <BasicButtons title="Log Out" handleAction={handleAction} />
    </div>
  );
};
