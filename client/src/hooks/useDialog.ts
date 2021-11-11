import React, { useCallback, useState } from 'react';

function useDialog(initState: boolean)
:[boolean, () => void, () => void] {
    const [open, setOpen] = useState(initState);

    const handleDialogOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleDialogClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return [open, handleDialogOpen, handleDialogClose];
}

export default useDialog;
