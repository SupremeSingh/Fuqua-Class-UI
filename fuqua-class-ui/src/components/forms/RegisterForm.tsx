import * as React from 'react';
import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { BasicButtons } from "../buttons/Button-FBase";

type CardProps = {
    title: string,
    setFName: any,
    setLName: any,
    setPubKey: any,
    setCName: any,
    setRole: any,
    setEmail: any, 
    setPassword: any,
    handleAction: any
  }

export const RegisterTextField: FunctionComponent<CardProps> = ({ title, setEmail, setPassword, setFName, setLName, setCName, setRole, setPubKey, handleAction }) => {
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
                <TextField id="firstName" label="Enter first name" variant="outlined" onChange={(e) => setFName(e.target.value)}/>
                <TextField id="lastName" label="Enter last name" variant="outlined" onChange={(e) => setLName(e.target.value)} />
                <br />                
                <TextField id="email" label="Enter the Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="password" label="Enter the Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>            
                <br />       
                <TextField id="coureName" label="Enter course name" variant="outlined" onChange={(e) => setCName(e.target.value)}/>
                <TextField id="role" label="Enter your role" variant="outlined" onChange={(e) => setRole(e.target.value)}/>            
                <br />            
                <TextField id="pubKey" label="Enter the Public Key" variant="outlined" onChange={(e) => setPubKey(e.target.value)}/>
            </Box>
            <BasicButtons title = {title} handleAction={handleAction} />
        </div>
    );
}