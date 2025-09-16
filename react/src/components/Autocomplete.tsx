"use client";

import * as React from "react";
import "./MyAutocomplete.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ComboBoxProps {
  size?: "small" | "medium";
  options: string[];
}

export default function ComboBox({ size = "medium", options }: ComboBoxProps) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      size={size}
      sx={{ width: 300 }}
      className="customAutocomplete"
      renderInput={(params) => <TextField {...params} label="Choose" />}
    />
  );
}
