import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import useDialog from "../../hooks/useDialog";
import TitleInputModal from "../modal/TitleInputModal";
import TitleStore from "../../stores/TitleStore";

interface Props {
    readonly: boolean;
}

/** 
 * 문제집 트리 제목
 */
function ProblemTreeTitle(props: Props) {
    const [titleModalOpen, handleTitleModalOpen, handleTitleModalClose] = useDialog();
    const problemTreeTitle = TitleStore;

    useEffect(() => {
        console.log(titleModalOpen);
    }, [titleModalOpen])

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
                {problemTreeTitle.title}
                {!props.readonly && 
                <IconButton style={{ justifyContent: "flex-end"}} onClick={handleTitleModalOpen} disabled={titleModalOpen}>
                    <EditIcon />
                </IconButton>}
            </div>
            <TitleInputModal open={titleModalOpen} onClose={handleTitleModalClose} />
        </div>
    );
}

export default ProblemTreeTitle;