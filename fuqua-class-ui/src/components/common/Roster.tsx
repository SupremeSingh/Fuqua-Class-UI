/* eslint-disable rest-spread-spacing */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FunctionComponent } from "react";
import { BasicButtons } from "./Button-FBase";
import { MetaMaskButtons } from "./Button-MM";
import { SendButtons } from "./Button-SendMoney";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  collection,
  query,
  doc,
  getDocs,
  onSnapshot,
  where
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
import { db } from "../../firebase";

type CardProps = {

};

export const Roster: FunctionComponent<CardProps> = ({ }) => {

  const [rows ,setRows]=useState([] as any)

  const fetchData = async() =>{
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const dataArray = [] as any;

    querySnapshot.forEach((doc) => {
      let dataBlock = doc.data();
      if (dataBlock.role.toLowerCase() === "student") {
        dataArray.push(doc.data());
      }
    });

    setRows(dataArray);
  }
  
  useEffect(() => {
    fetchData();
  }, [])


return (
    <div>
      <h3>Class Roster</h3>
      <div className="roster">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Metamask Account">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Course</TableCell>
                <TableCell align="left">Key</TableCell>
                <TableCell align="center">Send</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row: any) => (
                <TableRow
                  key={row.publickKey}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName + " " + row.lastName}
                  </TableCell>
                  <TableCell align="left">{row.courseName}</TableCell>
                  <TableCell align="left">{row.publicKey}</TableCell>
                  <TableCell align="center">
                    {<SendButtons title="Send" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </div>
  );

}
  

