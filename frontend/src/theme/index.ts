import { Theme, createTheme } from "@mui/material/styles";
import "../../src/styles.css";
import React from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    caption1: TypographyStyle;
    overline1: TypographyStyle;
    overline2: TypographyStyle;
    description: TypographyStyle;
  }
  interface TypographyVariantsOptions {
    caption1?: TypographyStyle;
    overline1?: TypographyStyle;
    overline2?: TypographyStyle;
    description?: TypographyStyle;
  }
  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
  }
  interface CustomPalette {
    structural: {
      background1: string;
      background2: string;
      accent: string;
      stroke1: string;
      structuralBg: string;
      loaderBackground: string;
      modalBackground: string;
    };
    textColor: {
      white: string;
      black: string;
      lowEmphasis: string;
      mediumEmphasis: string;
      highEmphasis: string;
    };
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface ButtonPropsVariantOverrides {
    login: true;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    caption1: true;
    overline1: true;
    overline2: true;
    description: true;
  }
}
interface TypographyStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
}
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 1081,
      lg: 1441,
      xl: 1920,
    },
  },
  spacing: 4,
  typography: {
    h1: {
      fontSize: "3.5rem",
      fontWeight: 600,
      lineHeight: "4.7812rem",
      fontFamily: "Manrope-semi-bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: "2rem",
      fontFamily: "Manrope-semi-bold",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: "1.75rem",
      fontFamily: "Manrope-semi-bold",
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
      fontFamily: "Manrope-regular",
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.625rem",
      fontFamily: "Manrope-regular",
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: "1.375rem",
      fontFamily: "Manrope-regular",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.375",
      fontFamily: "Manrope-regular",
    },
    caption1: {
      fontSize: "0.75rem",
      fontWeight: 700,
      lineHeight: "1.25rem",
      fontFamily: "Manrope-bold",
    },
    overline1: {
      fontSize: "0.625rem",
      fontWeight: 600,
      lineHeight: "1rem",
      fontFamily: "Manrope-regular",
    },
    overline2: {
      fontSize: "9px",
      fontWeight: 500,
      lineHeight: "7px",
      fontFamily: "Manrope-regular",
    },
    description: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "20px",
      fontFamily: "Manrope-regular",
    },
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      100: "#F2EAFD",
      300: "#0B69FF",
      400: "#1e88e5",
      500: "#8B3DFF",
    },
    textColor: {
      white: "#FFFFFF",
      black: "#2A3238",
      lowEmphasis: "#707477",
      mediumEmphasis: "#959596",
      highEmphasis: "#D3D4D4",
    },
    grey: {
      100: "#BFC4C8",
      200: "#959596",
      300: "#343536",
      400: "#252627",
      500: "#18191B",
    },
    structural: {
      background1: "#FFFFFF",
      background2: "#E5E7ED",
      accent: "#EC3A3A",
      stroke1: "#E3E4E6",
      structuralBg: "#F4F5F5",
      loaderBackground: "#D7DFE980",
      modalBackground: "#E0E0E0CC",
    },
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            "& input": {
              padding: "13px 16px",
              color: "#FFFFFF",
            },
            width: "100%",
            backgroundColor: `rgba('#FFFFFF', 0.4)`,
            "& input::placeholder": {
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              fontFamily: "Manrope-regular",
            },
            "& .MuiFilledInput-root": {
              borderRadius: "6px",
              "&:before": {
                borderBottom: "none",
              },
              "&:after": {
                borderBottom: "none",
              },
              "&:hover:before": {
                borderBottom: "none",
              },
              "&:hover:after": {
                borderBottom: "none",
              },
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            width: "100%",
            " MuiOutlinedInput-root": {
              borderColor: "#BFC4C8",
              "& input": {
                padding: "13px 16px",
                fontFamily: "Manrope-regular",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "22px",
              },
            },
            "& input::placeholder": {
              color: "#959596",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              fontFamily: "Manrope-regular",
            },
          },
        },
      ],
    },
    MuiLinearProgress: {
      variants: [
        {
          props: { variant: "determinate" },
          style: {
            height: "8px",
            backgroundColor: "#D7DFE980",
            borderRadius: "5vw",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#0B69FF",
            },
          },
        },
      ],
    },
    MuiBadge: {
      styleOverrides: {
        standard: {
          backgroundColor: "#EC3A3A",
          color: "#FFFFFF",
          height: "12px",
          minWidth: "12px",
          width: "12px",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            color: "#FFFFFF",
            borderRadius: "4px",
            marginTop: "1.25rem",
            backgroundColor: "#8B3DFF",
            textTransform: "none",
            ":disabled": {
              backgroundColor: "#F2EAFD",
              color: "#FFFFFF",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            textTransform: "none",
            color: "#959596",
            borderColor: "#959596",
            marginTop: "1.25rem",
            ":hover": {
              borderColor: "#959596",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            textTransform: "none",
            color: "#959596",
            borderColor: "#959596",
            marginTop: "1.25rem",
            ":hover": {
              borderColor: "#959596",
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            padding: "0px",
            margin: "0px",
            minWidth: "fit-content",
            ":hover": {
              backgroundColor: "transparent",
            },
          },
        },
      ],
    },
    MuiSelect: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            height: "36px",
            width: "fit-content",
            borderRadius: "4px",
            paddingLeft: "0px",
            paddingRight: "10px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                paddingRight: "12px",
              },
          },
        },
      ],
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#FFFFFF",
          },
        },
        colorPrimary: {
          color: "#959596",
        },
      },
    },
  },
});
export default theme;
