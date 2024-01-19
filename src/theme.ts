import { createTheme } from "@mui/material/styles";

const PRIMARY = "#000000";
const SECONDARY = "#FFFFFF";
const PAPER = "#F3F3F3";
const TEXT_PRIMARY = "#666666";
const TEXT_SECONDARY = "#434343";

const theme = createTheme({
  palette: {
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: SECONDARY,
      paper: PAPER,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 13,
        },
        body: {
          padding: 32,
          maxWidth: 800,
          margin: "auto",
          border: `solid 1px ${TEXT_PRIMARY}`,
        },
        h3: {
          fontWeight: "bold",
          fontSize: "1.5em",
          lineHeight: "1em",
          color: TEXT_SECONDARY,
          margin: 0,
          padding: "0 0 16px 0",
        },
        p: {
          lineHeight: "1.2em",
          padding: 0,
          margin: "0 0 8px 0",
          ":last-child": {
            margin: 0,
          },
        },
        a: {
          color: TEXT_PRIMARY,
          textDecoration: "none",
        },
        ul: {
          paddingInlineStart: 16,
          margin: 0,
          li: {
            lineHeight: "1.8em",
          },
        },
        ".dark": {
          color: TEXT_SECONDARY,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          textDecoration: "none",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          lineHeight: "2.5em",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 32,
        },
      },
    },
  },
});

export default theme;