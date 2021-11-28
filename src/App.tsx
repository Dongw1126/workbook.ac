import './App.css';
import MainComponent from './components/MainComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import Amplify from '@aws-amplify/core';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="main">
        <MainComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;