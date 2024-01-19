import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface Props {
  children?: ReactNode;
}

export const Experience: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        " p": {
          lineHeight: "1.5em",
          margin: 0,
        },
        ul: {
          marginBottom: 2,
          li: {
            lineHeight: "1.3em",
          },
        },
      }}
    >
      {children}
    </Box>
  );
};
