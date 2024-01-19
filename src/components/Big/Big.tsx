import React, { ReactNode, useContext } from "react";
import { Grid, SxProps } from "@mui/material";
import { PersonalDetails, usePersonal } from "../PersonalDetails";
import { SlotsContext } from "../Slots";
import { Block } from "../Block";
import { Header } from "../Header";
import { Experience } from "../Experience";

const Left: React.FC<{ sx?: SxProps, children: ReactNode }> = ({ sx, children }) => (
  <Block
    sx={{
      paddingRight: 4,
      ...sx,
    }}
  >
    {children}
  </Block>
);

export const Big: React.FC = () => {
  const { hasPersonal } = usePersonal();
  const slots = useContext(SlotsContext);
  return (
    <>
      <Header>{slots.header}</Header>
      {hasPersonal ?
        <Grid container spacing={0}>
          <Grid item xs={4.8} sx={{ borderBottom: 1 }}>
            <PersonalDetails />
          </Grid>
          <Grid item xs={7.2} sx={{ borderBottom: 1 }}>
            <Block sx={{ paddingLeft: 4, paddingTop: 0, borderLeft: 1 }}>
              {slots.profile}
            </Block>
          </Grid>
        </Grid>
        : <Block sx={{ paddingTop: 0, borderBottom: 1 }}>{slots.profile}</Block>
      }
      <Grid container spacing={0}>
        <Grid item xs={4.8}>
          <Grid item xs={12} sx={{ borderBottom: 1 }}>
            <Left>{slots.skills}</Left>
          </Grid>
          <Grid item xs={12} sx={{ borderBottom: 1 }}>
            <Left>{slots.education}</Left>
          </Grid>
          <Grid item xs={12}>
            <Left sx={{ borderBottom: 0 }}>{slots.tools}</Left>
          </Grid>
        </Grid>
        <Grid item xs={7.2}>
          <Grid item xs={12}>
            <Block sx={{
              paddingLeft: 4,
              borderLeft: 1,
              paddingBottom: 0,
            }}>
              <Experience>{slots.experience}</Experience>
            </Block>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
