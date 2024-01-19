import React, { ReactNode } from "react";
import { Box, SxProps } from "@mui/material";

interface Props {
  sx?: SxProps,
  children?: ReactNode;
}

export const Header: React.FC<Props> = ({ sx, children }) => {
  return (
    <Box
      bgcolor="background.paper"
      sx={{
        textTransform: "capitalize",
        margin: "-32px -32px 32px -32px",
        padding: "32px 32px 8px 32px",
        paddingBottom: 1,
        h1: {
          fontWeight: "lighter",
          fontSize: "3em",
          color: "#000000",
          lineHeight: "0.7em",
          margin: "0 0 0 -3px",
          padding: 0,
        },
        h4: {
          fontWeight: "lighter",
          fontSize: "1.5em",
          lineHeight: "1em",
          color: "text.secondary",
          margin: "0 0 0 -1px",
          padding: "16px 0 8px 0",
        },
        span: {
          fontWeight: "bold",
        },
        a: {
          textTransform: "lowercase",
        },
        ...sx,
      }}
      component="header"
    >
      {children}
    </Box>
  );
};
