import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FunctionComponent, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Modal from "@mui/material/Modal";
import { useContractMethod } from "../../hooks/index";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

type CardProps = {
    title: string,
    name: string,
    address: any,
  }

export const SendButtons : FunctionComponent<CardProps> = ({ title, name, address }) => {

    const [amount, setAmount] = useState("");
    const { state: rewardStudentState, send: rewardStudent } = useContractMethod("rewardStudent");
    

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSend = () => {
        let amount_int = parseInt(amount);
        if (amount_int !== 0) {
            let amount_with_decimals = amount_int * (10 ** 18);
            rewardStudent(address, amount_with_decimals);
            setAmount("0");
        } else {
            alert("Please enter a value")
        }
    }

    return (
      <div>
        <Button variant="contained" onClick={handleOpen}>{title}</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`Sending to ${name}`}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please indicate a value
            </Typography>
            <br />
            <TextField id="email" label="Enter Amount" variant="outlined" onChange={(e) => setAmount(e.target.value)}/>
            <br /> <br />
            <Button variant="contained" onClick={handleSend}>Send</Button>
            {" "}
            {" "}
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
          </Box>
        </Modal>
      </div>
    );
  };