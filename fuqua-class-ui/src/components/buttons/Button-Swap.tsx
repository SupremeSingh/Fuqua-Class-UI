import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FunctionComponent, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useSwapperContractMethod } from "../../hooks/SwapperHook";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  title: string;
};

export const SwapButtons: FunctionComponent<CardProps> = ({ title }) => {
  const [amount, setAmount] = useState("");
  const [swapFrom, setSwapFrom] = useState("");
  const [swapTo, setSwapTo] = useState("");
  const { state: SwapTokensState, send: SwapTokens } =
    useSwapperContractMethod("SwapTokens");

  // 1 is BB, 2 is Eth, 3 is FQ1  
  const indexToAddress: { [index: string]: string} = {"1" : "0xd45a730cf0cf02753aff1e5ec3543b510576529d", "2" : "0xac7fa82f7b2937b0714a61c84fa9902224ad5a65", "3" : "0xa016d1308a9c21a6d0785a563ab4c1064df3e11e"} as any  

  const handleChangeFrom = (event: SelectChangeEvent) => {
    setSwapFrom(event.target.value as string);
  };

  const handleChangeTo = (event: SelectChangeEvent) => {
    setSwapTo(event.target.value as string);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // CORRECT HERE
  const handleSend = async () => {
    let addressFrom = indexToAddress[swapFrom];
    let addressTo = indexToAddress[swapTo];
    
    await SwapTokens(addressFrom, addressTo, amount);
    console.log("Token swapping in progress");

    setOpen(false);
  };

  return (
    <div>
      <h3>Swapping</h3>
      <p>
        As the name implies, a token swap is a process during which investors
        swap their existing tokens for another kind. Own Ethereum? You can
        simply swap ETH tokens for Blue Block or FQ1 and have the exchange
        executed within minutes. Token swapping is exclusively performed on a
        DeFi protocol, particularly a decentralized exchange.
      </p>
      <br />
      <Button variant="contained" onClick={handleOpen}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Choose swapping options`}
          </Typography>
          <br />
          <Box sx={{ minWidth: 150 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Swap From
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={swapFrom}
                onChange={handleChangeFrom}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>
                  Blue Block
                </MenuItem>
                <MenuItem value={2}>
                  Ethereum
                </MenuItem>
              </Select>
            </FormControl>
          </Box>{" "}
          <Box sx={{ minWidth: 150 }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Swap To
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={swapTo}
                onChange={handleChangeTo}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={3}>
                  FQ1
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <br />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            How much would you like to swap ?
          </Typography>
          <br />
          <TextField
            id="email"
            label="Enter Amount"
            variant="outlined"
            onChange={(e) => setAmount(e.target.value)}
          />
          <br /> <br />
          <Button variant="contained" onClick={handleSend}>
            Swap
          </Button>{" "}
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
