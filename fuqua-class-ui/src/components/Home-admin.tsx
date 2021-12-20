import React, { useEffect } from "react";
import { FunctionComponent } from "react";
import { BasicButtons } from "./common/Button-FBase";
import { MetaMaskButtons } from "./common/Button-MM";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { collection, query, where, doc, getDocs, onSnapshot } from "firebase/firestore";
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

function createData(name: string, course: string) {
  return { name, course };
}

const getAllData = async (role: string) => {

  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);
  let dataBase = await getDocs(q);

  querySnapshot.forEach((doc: any) => {
    let userData = doc.data();
    // Isolate all the students
    if (userData.role === role) {
     dataBase.push(createData(userData.firstName, userData.courseName));
    } 
  });
  return dataBase;
};

export const Home_Admin: FunctionComponent<CardProps> = ({ handleAction }) => {
  const auth = getAuth();
  let firstName: string;
  let publicKey: any;

  let rows: any[] = await getAllData("Student");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        let userData = doc.data();
        firstName = userData?.firstName ?? "No First Name";
        publicKey = userData?.publicKey ?? "No Public Key";
      });
      getAllData("Student");
    } else {
      alert("User not signed in");
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

      <h3>Course Roster</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Metamask Account">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <br/>

      <BasicButtons title="Log Out" handleAction={handleAction} />
    </div>
  );
};
