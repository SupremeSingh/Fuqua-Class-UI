import * as React from 'react';
import { FunctionComponent } from 'react';
import Button from '@mui/material/Button';

type CardProps = {
    title: string
  }

export const SendButtons : FunctionComponent<CardProps> = ({ title }) => {
    return (
        <Button variant="contained" >{title}</Button>
    );
}