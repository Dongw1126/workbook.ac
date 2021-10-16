import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import CreateWorkbook from "../pages/CreateWorkbook"
import Info from "../pages/Info"
import Nav from "../pages/Nav"

function MainComponent() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route exact path="/" component={CreateWorkbook} />
                    <Route exact path="/info" component={Info} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default MainComponent;
