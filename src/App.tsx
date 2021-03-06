import './App.css';
import MainComponent from './components/MainComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Observer } from "mobx-react";
import { grey } from '@mui/material/colors';

import Amplify from '@aws-amplify/core';
import { DataStore } from 'aws-amplify';
import awsconfig from "./aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';

DataStore.clear();
Amplify.configure(awsconfig);
DataStore.start();

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
      <Observer>{() => (
        <Authenticator.Provider>
          <div className="main">
            <MainComponent />
          </div>
        </Authenticator.Provider>)}
      </Observer>
    </ThemeProvider>
  );
}

export default App;