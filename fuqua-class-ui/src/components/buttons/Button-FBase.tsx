import * as React from 'react';
import { FunctionComponent } from 'react';
import Button from '@mui/material/Button';

type CardProps = {
    title: string,
    handleAction: any
  }

export const BasicButtons : FunctionComponent<CardProps> = ({ title, handleAction }) => {
    return (
        <Button variant="contained" onClick={handleAction} >{title}</Button>
    );
}