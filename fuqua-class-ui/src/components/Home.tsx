import React, { useEffect } from 'react';
import { FunctionComponent } from 'react';
import { BasicButtons } from "./common/Button";
import Box from '@mui/material/Box';

type CardProps = {
    userName: string,
    handleAction: any
  }

export const Home: FunctionComponent<CardProps> = ({ userName, handleAction }) => {

    return (
        <div>
            <div className="heading-container">
                <h3>
                    Welcome {userName}
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
            </Box>
            <BasicButtons title = "Log Out" handleAction={handleAction} />
        </div>
    )
}