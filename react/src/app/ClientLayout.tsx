"use client";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme();

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
