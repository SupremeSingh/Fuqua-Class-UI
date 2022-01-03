import * as React from "react";
import { FunctionComponent, useState } from "react";
import Button from "@mui/material/Button";
import { List, ListItem, Divider, ListItemText } from "@mui/material";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther, formatUnits } from "@ethersproject/units";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


type CardProps = {
  title: string;
};

export const MetaMaskButtons: FunctionComponent<CardProps> = ({ title }) => {
  const { activateBrowserWallet, account } = useEthers();
  
  const FQOne = "0xa016d1308a9c21a6d0785a563ab4c1064df3e11e";
  const BlueBlock = "0xd45a730cf0cf02753aff1e5ec3543b510576529d";

  function createData(name: string, balance: any, ticker: string) {
    return { name, balance, ticker };
  }

  const rows = [
    createData(
      "Ethereum",
      parseFloat(formatEther(useEtherBalance(account) ?? 0)).toFixed(3),
      "ETH"
    ),
    createData(
      "FQ1 Token",
      parseFloat(String(useTokenBalance(FQOne, account)?.toNumber() ?? 0 )).toFixed(3),
      "SYM"
    ),
    createData(
      "Blue Block",
      parseFloat(String(useTokenBalance(BlueBlock, account)?.toNumber() ?? 0 )).toFixed(3),
      "BB"
    )
  ];



  function handleConnectWallet() {
    activateBrowserWallet();
  }


  return account ? (
    <div>
      <h3>Your Account</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Metamask Account">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Balance</TableCell>
              <TableCell align="left">Ticker</TableCell>
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
                <TableCell align="left">{row.balance}</TableCell>
                <TableCell align="left">{row.ticker}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <Button variant="contained" onClick={handleConnectWallet}>
      {title}
    </Button>
  );
};
