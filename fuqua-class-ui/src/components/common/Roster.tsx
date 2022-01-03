/* eslint-disable rest-spread-spacing */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FunctionComponent } from "react";
import { BasicButtons } from "../buttons/Button-FBase";
import { MetaMaskButtons } from "../buttons/Button-MM";
import { SendButtons } from "../buttons/Button-SendMoney";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  collection,
  query,
  doc,
  getDocs,
  onSnapshot,
  where,
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
import { useContractMethod } from "../../hooks/index";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther, formatUnits } from "@ethersproject/units";

type CardProps = {};

export const Roster: FunctionComponent<CardProps> = ({}) => {
  let [rows, setRows] = useState([] as any);
  const [balances, setBalances] = useState({} as any);
  const [course, setCourse] = useState("");

  const FQOne = "0xa016d1308a9c21a6d0785a563ab4c1064df3e11e";

  const { state: checkBalanceState, send: checkBalance } = useContractMethod("checkBalance");

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  };

  const fetchData = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    let dataArray = [] as any;
    const balanceDict = {} as any;

    querySnapshot.forEach(async (doc) => {
      let dataBlock = doc.data();
      if (dataBlock.role.toLowerCase() === "student") {
        dataArray.push(doc.data());
        let balance = await checkBalance(dataBlock.publicKey)
        console.log(balance)
        if (balance !== undefined) {
          balanceDict[dataBlock.publicKey] = balance; 
        } else {
          balanceDict[dataBlock.publicKey] = 0; 
        }
      }
    });

    dataArray.sort(function (a: any, b: any) {
      let x = a.courseName.toUpperCase() as string,
        y = b.courseName.toUpperCase() as string;
      return x === y ? 0 : x > y ? 1 : -1;
    });

    setRows(dataArray);
    setBalances(balanceDict);
  };

  useEffect(() => {
    fetchData();
  }, []);

   if (course == "10") {
     rows = rows.filter((row: { courseName: string; }) => row.courseName.toLowerCase() == "mba");  
   } else if (course == "20") { 
    rows = rows.filter((row: { courseName: string; }) => row.courseName.toLowerCase() == "mms");  
   } else if (course == "30") {
    rows = rows.filter((row: { courseName: string; }) => row.courseName.toLowerCase() != "mba" && row.courseName.toLowerCase() != "mms");  
   } 

  return (
    <div>
      <h3>Class Roster</h3>

      <br />

      <Box sx={{ minWidth: 150 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={course}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>MBA</MenuItem>
            <MenuItem value={20}>MMS</MenuItem>
            <MenuItem value={30}>Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <br />
      <br />

      <div className="roster">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Metamask Account">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Course</TableCell>
                <TableCell align="left">FQ1 Balance</TableCell>
                <TableCell align="center">Send</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row: any) => (
                  <TableRow
                    key={row.publickKey}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.firstName + " " + row.lastName}
                    </TableCell>
                    <TableCell align="left">{row.courseName}</TableCell>
                    <TableCell align="left">
                      {balances[row.publicKey]}
                    </TableCell>
                    <TableCell align="center">
                      {
                        <SendButtons
                          title="Send"
                          name={row.firstName}
                          address={row.publicKey}
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
