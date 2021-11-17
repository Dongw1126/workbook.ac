import { useState } from "react";
import Split from 'react-split'
import WorkbookComponent from '../components/WorkbookComponent';
import SearchComponent from '../components/SearchComponent';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

function EditWorkbook() {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div style={{ margin: "10px 0 10px 10px" }}>
                <LoadingButton
                    style={{ borderRadius: 50, margin: "0 15px 0 0"}}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained">
                    저장
                </LoadingButton>
                <Button 
                    style={{ borderRadius: 50 }} 
                    variant="outlined"
                    startIcon={<CloseIcon/>}>
                    취소
                </Button>
            </div>
            <div style={{ height: "100%" }}>
                <Split
                    className="split"
                    sizes={[40, 60]}
                    minSize={300}
                    gutterSize={10}
                    cursor="col-resize"
                >
                    <div>
                        <WorkbookComponent />
                    </div>
                    <div style={{ margin: 10 }}>
                        <SearchComponent />
                    </div>
                </Split>
            </div>
        </div>
    );
}

export default EditWorkbook;