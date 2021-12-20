import * as React from 'react';
import { FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import { List, ListItem, Divider, ListItemText } from '@mui/material';
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

type CardProps = {
    title: string
  }

export const MetaMaskButtons : FunctionComponent<CardProps> = ({ title }) => {

    const {activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    function handleConnectWallet() {
        activateBrowserWallet();
      }

    return account ? (
        <div>
        <h3>Your Account</h3>   
        <List component="nav" aria-label="mailbox folders">
        <ListItem button>
            <ListItemText primary= {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3) + " " + "ETH"} />
        </ListItem>
        <Divider />
        <ListItem button divider>
            <ListItemText primary= {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3) + " " + "ETH"}/>
        </ListItem>
        <ListItem button>
            <ListItemText primary= {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3) + " " + "ETH"}/>
        </ListItem>
        <Divider light />
        <ListItem button>
            <ListItemText primary= {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3) + " " + "ETH"}/>
        </ListItem>
        </List>
        </div>
    ):(
        <Button variant="contained" onClick={handleConnectWallet}>{title}</Button>
        
    );
}