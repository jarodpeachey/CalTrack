import { createMuiTheme } from '@material-ui/core/styles';

const overrides = {
  MuiButton: {
    root: {
      userSelect: 'none',
      outline: 'none',
      margin: '8px',
    },
  },
};

const breakpoints = {
  keys: ['sm', 'md', 'lg', 'xl'],
  values: {
    sm: '540px',
    md: '769px',
    lg: '1024px',
    xl: '1220px',
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6f00',
      dark: '#ff6f00',
      contrastText: '#ffffff',
    }, // Feel free to change this
    secondary: {
      main: '#355EAF',
      dark: '#355EAF',
    },
  },
  breakpoints,
  overrides,
  typography: {
    useNextVariants: true,
  },
});

export default theme;
