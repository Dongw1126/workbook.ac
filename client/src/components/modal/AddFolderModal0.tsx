import React, { useState } from 'react';
import Modal from "react-modal";

function AddFolderModal0() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <button onClick={()=> setModalOpen(true)}>Modal Open</button>
            <Modal isOpen={modalOpen}>
                asdf
                <button onClick={()=> setModalOpen(false)}>Modal Close</button>
            </Modal>
        </div>
    );
}

export default AddFolderModal0;
