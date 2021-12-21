import React, { useEffect, useState } from "react";
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
    handleAction: any;
};

export const Roster: FunctionComponent<CardProps> = ({ handleAction }) => {

const [rows, setRows] = useState([{}]);

// Start the fetch operation as soon as
// the page loads
window.addEventListener('load', () => {
    fetchData("Student");
  });

function createData(name: string, course: string, publicKey: any) {
  return { name, course, publicKey };
}


const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

return (
    <div>
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
              {rows.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.course}</TableCell>
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
  

