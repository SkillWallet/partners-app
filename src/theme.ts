import { createTheme } from '@mui/material/styles';
import { Fade } from '@mui/material';

const palette = {
  type: 'dark',
  background: {
    default: '#000000',
    paper: '#FFFFFF',
    dark: '#f9f9f9',
  },
  text: {
    secondary: '#D8D8D8',
    primary: '#FFFFFF',
    disabled: '#CCCCCC',
  },
  primary: {
    main: '#000000',
  },
  secondary: {
    main: '#8F37AA',
  },
  info: {
    main: '#FFFFFF',
    dark: '#7C7C7C',
  },
};

const fontSize = 14; // px
const htmlFontSize = 16;
const coef = fontSize / 14;

export const SwTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          .Mui-disabled {
            color: ${palette.text.disabled};
          }
        `,
    },
    MuiTooltip: {
      defaultProps: {
        TransitionComponent: Fade,
      },
      styleOverrides: {
        tooltip: {
          border: '3px solid',
          borderColor: palette.text.primary,
          borderRadius: '4px',
          backgroundColor: palette.background.default,
          boxSizing: 'border-box',
        },
      },
    },
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: palette.primary.main,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette,
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontSize: 16,
    allVariants: {
      color: palette.primary.main,
    },
    // htmlFontSize: 16,
    // // @ts-ignore
    // pxToRem: (size: number) => {
    //   console.log('size: ', size);
    //   return `${(size / htmlFontSize) * coef}rem`;
    // },
    button: {
      fontSize: '1.25rem', // 20px
    },
    body1: {
      fontSize: '0.875rem', // 14px
    },
    body2: {
      fontSize: '0.75rem', // 12px
    },
    subtitle1: {
      fontSize: '1.5625rem', // 25px
    },
    subtitle2: {
      fontSize: '0.875rem', // 14px
    },
    h1: {
      fontSize: '1.875rem', // 30px
    },
    h2: {
      fontSize: '1.25rem', // 20px
    },
    h3: {
      fontSize: '1.125rem', // 18px
    },
    h4: {
      fontSize: '1rem', // 16px
    },
    h5: {
      fontSize: '0.75rem', // 12px
    },
    h6: {
      fontSize: '0.625rem', // 10px
    },
    xl: {
      fontSize: '50px',
    },
    xxl: {
      fontSize: '60px',
    },
    fontFamily: ['Josefin Sans', 'sans-serif'].join(','),
  },
});

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    xl: React.CSSProperties;
    xxl: React.CSSProperties;
  }

  interface TypographyOptions {
    xl?: React.CSSProperties;
    xxl: React.CSSProperties;
  }
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    xl: true;
    xxl: true;
  }
}
