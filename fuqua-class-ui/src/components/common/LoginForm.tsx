import * as React from 'react';
import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

import { BasicButtons } from "./Button-FBase";

type CardProps = {
    title: string,
    setEmail: any, 
    setPassword: any,
    handleAction: any
  }

export const LoginTextField: FunctionComponent<CardProps> = ({ title, setEmail, setPassword, handleAction }) => {
    return (
        <div>
            <div className="heading-container">
                <h3>
                    Login Form
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="email" label="Enter the Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="password" label="Enter the Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
            </Box>
            <BasicButtons title = {title} handleAction={handleAction} />
            
            <br />
            <br />
        
            <Link to="./register" style={{ textDecoration: 'none' }}>
                <Button variant="contained">{"Register New Account"}</Button>     
            </Link>
        </div>
    );
}