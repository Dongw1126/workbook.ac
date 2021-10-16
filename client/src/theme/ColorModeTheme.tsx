import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
export const theme = React.useMemo(
    () =>
        createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
    [prefersDarkMode],
);