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

// const colors = {
//   keys: ['gray1', 'gray2', 'gray3', 'gray4', 'gray5', 'gray6', 'gray7'],
//   values: {
//     gray1: '#f7f7f7',
//     gray2: '#eeeeee',
//     gray3: '#d3d3d3',
//     gray4: '#bdbdbd',
//     gray5: '#8d8d8d',
//     gray6: '#4b4b4b',
//     gray7: '#2b2a2a',
//   },
// };

const muiTheme = createMuiTheme({
  palette: {
    secondary: {
      main: '#F5A623',
      light: '#ECB354',
      dark: '#E49A1F',
      contrastText: '#fff',
    }, // Feel free to change this
    primary: {
      main: '#158EE1',
      light: '#4CA3DE',
      dark: '#057DCF',
      contrastText: '#fff',
    },
  },
  breakpoints,
  overrides,
  // colors,
  typography: {
    useNextVariants: true,
  },
});

export default muiTheme;
