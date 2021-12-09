import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';
import useDialog from '../../hooks/useDialog';
import WorkbookCreateModal from "../../components/modal/WorkbookCreateModal";
import WorkbookList from "../../components/search/workbook/WorkbookSearchList";
import example_wb_my from "../../components/workbook/example_wb_my.json"

function MyWorkbook() {
    const [createClicked, setCreateClicked] = useState(false);
    const { scale } = useSpring({ 
        scale: createClicked ? 0.8 : 1,
        config: {
            tension: 700
        }
     });
    const [createModalOpen, handleCreateModalOpen, handleCreateModalClose] = useDialog();
    

    return (
        <div>
            <div style={{ textAlign: "center", margin: "2rem 0", fontSize: "3rem", fontWeight: 700 }}>
                나의 문제집
            </div>
            <animated.div
                onMouseDown={() => setCreateClicked(true)}
                onMouseUp={() => setCreateClicked(false)}
                style={{transform: scale.to(s => `scale(${s})`)}}>
                <SpeedDial
                    ariaLabel="Add Workbook"
                    icon={<AddIcon />}
                    onClick={handleCreateModalOpen}
                />
            </animated.div>
            <div>
                <WorkbookList editable={true} data={example_wb_my} />
            </div>
            <WorkbookCreateModal open={createModalOpen} onClose={handleCreateModalClose}/>
        </div>
    );
}

export default MyWorkbook;