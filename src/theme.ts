import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Fade, PaletteOptions, SimplePaletteColorOptions } from '@mui/material';
import createShadows from '@partners-utils/shadows';
import { Shadows } from '@mui/material/styles/shadows';

const palette: PaletteOptions & { type: string } = {
  type: 'dark',
  background: {
    default: '#161615',
    paper: '#FFFFFF',
  },
  text: {
    secondary: '#D8D8D8',
    primary: '#FFFFFF',
    disabled: '#CCCCCC',
  },
  primary: {
    main: '#161615',
  },
  secondary: {
    main: '#8F37AA',
  },
  info: {
    main: '#FFFFFF',
    dark: '#7C7C7C',
  },
};

export const SwTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          .Mui-disabled {
            color: ${palette.text.disabled};
            fill: ${palette.text.disabled};
            opacity: 1 !important;
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
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: palette.text.primary,
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
  shadows: createShadows((palette.secondary as SimplePaletteColorOptions).main) as Shadows,
  typography: {
    fontSize: 16,
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
      fontSize: '1rem', // 16px
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
      fontSize: '0.875rem', // 14px
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
    fontFamily: ['Josefin Sans', ' sans-serif'].join(','),
  },
} as ThemeOptions);

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
