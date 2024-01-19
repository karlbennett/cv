import React from "react";
import { useMediaQuery } from "@mui/material";
import theme from "../../theme";
import { Big } from "../Big";
import { Small } from "../Small";

export const Layout: React.FC = () => {
  const medium = useMediaQuery(theme.breakpoints.up("sm"));
  if (medium) {
    return (<Big />);
  }
  return (<Small />);
};
