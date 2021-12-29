import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FunctionComponent, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type CardProps = {};

export const BasicSelect: FunctionComponent<CardProps> = ({}) => {
  const [course, setCourse] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={course}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>MBA</MenuItem>
          <MenuItem value={20}>MMS</MenuItem>
          <MenuItem value={30}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};