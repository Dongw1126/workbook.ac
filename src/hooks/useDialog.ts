import { useCallback, useState } from 'react';

/**
 * MUI Dialog 사용을 위한 Custom hook
 */
function useDialog()
:[boolean, () => void, () => void] {
    const [open, setOpen] = useState(false);

    const handleDialogOpen = useCallback(() => {
        // console.log("handleDialogOpen call");
        setOpen(true);
    }, [setOpen]);

    const handleDialogClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return [open, handleDialogOpen, handleDialogClose];
}

export default useDialog;
