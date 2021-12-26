import * as React from "react";
import { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import { List, ListItem, Divider, ListItemText } from "@mui/material";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const FQOne = "0x451A3C5ae32A0800Ef2668Ceb07DFC294fd43775";
const BlueBlock = "0xd45a730cf0cf02753aff1e5ec3543b510576529d";

type CardProps = {
  title: string;
};

export const MetaMaskButtons: FunctionComponent<CardProps> = ({ title }) => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const FQOneTokenBalance = useTokenBalance(FQOne, account);
  const BlueBlockTokenBalance = useTokenBalance(BlueBlock, account);
  
  function createData(name: string, balance: any, ticker: string) {
    return { name, balance, ticker };
  }

  const rows = [
    createData(
      "Ethereum",
      parseFloat(formatEther(etherBalance ?? 0)).toFixed(3),
      "ETH"
    ),
    createData(
      "FQ1 Token",
      parseFloat(formatEther(FQOneTokenBalance ?? 0)).toFixed(3),
      "FQ1"
    ),
    createData(
      "Blue Block",
      parseFloat(formatEther(BlueBlockTokenBalance ?? 0)).toFixed(3),
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
            {rows.map((row) => (
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
