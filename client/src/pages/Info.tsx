import React from 'react';
import useDialog from "../hooks/useDialog";
import AddFolderModal from "../components/modal/AddFolderModal";

function Info() {
    const [open, handleClickOpen, handleClose] = useDialog(false);

    return (
        <div>
            <button onClick={handleClickOpen}/>
            <AddFolderModal open={open} onClose={handleClose} />
            소개 페이지
        </div>
    );
}

export default Info;