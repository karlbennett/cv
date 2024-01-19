import React, { ReactNode } from "react";
import { Box, SxProps } from "@mui/material";

interface Props {
  sx?: SxProps,
  children?: ReactNode;
}

export const Block: React.FC<Props> = ({ sx, children }) => {
  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        overflow: "auto",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
