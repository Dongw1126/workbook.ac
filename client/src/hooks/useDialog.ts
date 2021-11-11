import React, { useCallback, useState } from 'react';

function useDialog()
:[boolean, () => void, () => void] {
    const [open, setOpen] = useState(false);

    const handleDialogOpen = useCallback(() => {
        console.log("handleDialogOpen call");
        setOpen(true);
    }, [setOpen]);

    const handleDialogClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return [open, handleDialogOpen, handleDialogClose];
}

export default useDialog;
