import React, { useEffect, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import { Block } from "../Block";
import { Link, List, ListItem, ListItemIcon, SxProps } from "@mui/material";

interface Props {
  sx?: SxProps,
}

export const populatePersonal = (populate: (personal: Personal) => void) =>
  ({ details }: { details: Details }) => populate({ hasPersonal: true, details });

export const ignoreNotFound = () => {
  // The personal.json may or may not be present, so a Not Found should not cause an error.
};

export const usePersonal = (): Personal => {
  const [personal, setPersonal] = useState({} as Personal);
  useEffect(() => {
    // eslint-disable-next-line import/extensions
    import(/* webpackIgnore: true */"/personal.js").then(populatePersonal(setPersonal)).catch(ignoreNotFound);
  }, []);
  return personal;
};

export const PersonalDetails: React.FC<Props> = ({ sx }) => {
  const { hasPersonal, details } = usePersonal();
  return hasPersonal ? (
    <Block
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        ...sx,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <MailOutlineIcon />
          </ListItemIcon>
          <Link href={`mailto:${details.email}`}>{details.email}</Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <LocalPhoneIcon />
          </ListItemIcon>
          <Link href={`tel:${details.phone.replaceAll(" ", "")}`}>{details.phone}</Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <Link href={details.address.link}>{details.address.text}</Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <Link href={details.website}>{details.website}</Link>
        </ListItem>
      </List>
    </Block>
  ) : null;
};
