import React from "react";
import Typography from '@mui/material/Typography';
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ProblemData } from "./Types";

type Props = {
    data?: ProblemData;
    droppable?: boolean;
};

const theme = createTheme({
    typography: {
        fontFamily: [
            'Pretendard',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export const TypedText: React.FC<Props> = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography sx={{ display: 'inline', mr: 2 }}>{props.droppable ? "" : props.data?.id}</Typography>
            <Typography sx={{ display: 'inline' }}>{props.data?.name}</Typography>
        </ThemeProvider>
    );
};