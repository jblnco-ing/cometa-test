import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#828282',
    },
    secondary: {
      main: '#B7B7B7',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Open Sans', 
      'sans-serif',
    ].join(','),
  },
});

export default theme;
