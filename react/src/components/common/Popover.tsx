"use client";
import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";

interface ScrollClosePopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
  anchorOrigin?: {
    vertical: "top" | "center" | "bottom" | number;
    horizontal: "left" | "center" | "right" | number;
  };
  transformOrigin?: {
    vertical: "top" | "center" | "bottom" | number;
    horizontal: "left" | "center" | "right" | number;
  };
  popoverClassName?: string;
}

export default function ScrollClosePopover({
  anchorEl,
  open,
  onClose,
  children,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  transformOrigin = { vertical: "top", horizontal: "center" },
  popoverClassName,
}: ScrollClosePopoverProps) {
  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      onClose();
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, onClose]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      disableRestoreFocus
      PaperProps={{
        className: popoverClassName,
      }}
    >
      <div className="inner">{children}</div>
    </Popover>
  );
}
