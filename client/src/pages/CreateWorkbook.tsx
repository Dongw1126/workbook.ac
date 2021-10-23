import React from "react";
import Box from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TreeComponent from '../components/TreeComponent';
import SearchComponent from '../components/SearchComponent';

function CreateWorkbook() {
    return (
        <div>
            <MuiGrid container xs>
                <MuiGrid item xs>
                    <Box sx={{ m:3, height: '100vh' }}>
                        <TreeComponent/>
                    </Box>
                </MuiGrid>
                <Divider orientation="vertical" flexItem/>
                <MuiGrid item xs>
                    <Box sx={{ m:3 }}>
                        <SearchComponent/>
                    </Box>
                </MuiGrid>
            </MuiGrid>
            
        </div>
    );
}

export default CreateWorkbook;