import React, { useContext } from "react";
import { Box } from "@mui/material";
import { PersonalDetails } from "../PersonalDetails";
import { SlotsContext } from "../Slots";
import { Block } from "../Block";
import { Header } from "../Header";
import { Experience } from "../Experience";

export const Small: React.FC = () => {
  const slots = useContext(SlotsContext);
  return (
    <Box component="main">
      <Header sx={{ marginBottom: 0 }}>{slots.header}</Header>
      <PersonalDetails sx={{ borderBottom: 1, paddingTop: 4, paddingBottom: 4 }} />
      {
        Object.entries(slots)
          .filter(([key]) => "header" !== key)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(([_, slot], index, array) =>
            <Block
              key={index}
              sx={{
                borderBottom: 1,
                ":last-child": {
                  paddingBottom: 0,
                  borderBottom: 0,
                },
              }}
            >
              {array.length - 1 === index ? <Experience>{slot}</Experience> : slot}
            </Block>,
          )
      }
    </Box>
  );
};
