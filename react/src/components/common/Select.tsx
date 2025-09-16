"use client";

import * as React from "react";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ArrowForwardIos";

interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectBoxProps<T extends string | number> {
  className?: string;
  label: string;
  name?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  fullWidth?: boolean;
  minWidth?: number;
  autoWidth?: boolean;
  iconClassName?: string;
  optionClassName?: string;
}

export default function SelectBox<T extends string | number>({
  className,
  label,
  name,
  value,
  options,
  onChange,
  fullWidth = true,
  minWidth = 120,
  autoWidth,
  iconClassName,
  optionClassName,
}: SelectBoxProps<T>) {
  const handleChange = (event: SelectChangeEvent<T>) => {
    const val = event.target.value;
    const parsedValue = typeof value === "number" ? Number(val) : val;
    onChange(parsedValue as T);
  };

  return (
    <div
      className={`select ${className || ""}`.trim()}
      style={{ minWidth: minWidth, width: fullWidth ? "100%" : undefined }}
    >
      <FormControl fullWidth={true}>
        <InputLabel className="select-label" id={`${name || label}-label`}>
          {label}
        </InputLabel>
        <Select
          labelId={`${name || label}-label`}
          id={name}
          value={value}
          label={label}
          autoWidth={autoWidth}
          onChange={handleChange} // event 타입과 일치
          input={
            <OutlinedInput
              classes={{
                root: "select-input",
                notchedOutline: "select-fieldset",
              }}
            />
          }
          MenuProps={{
            disablePortal: true,
            PaperProps: {
              className: "select-option",
            },
          }}
          //classes={{
          //  icon: "material-symbols-outlined",
          //}}
          IconComponent={(props) => (
            <ExpandMoreIcon
              {...props}
              className={`select-icon ${iconClassName ?? ""} ${props.className ?? ""}`.trim()}
              fontSize="small" // 또는 "medium", "inherit", "large"
            />
          )}
        >
          {options.map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value} className={optionClassName}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
