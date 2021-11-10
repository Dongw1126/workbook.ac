import React, { useCallback, useEffect, useState } from 'react';

function useDialog(initState: boolean)
:[boolean, () => void, () => void] {
    const [open, setOpen] = useState(initState);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return [open, handleClickOpen, handleClose];
}

export default useDialog;
