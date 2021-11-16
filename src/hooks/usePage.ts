import { useCallback, useState } from 'react';

/**
 * 검색 페이지 번호 Custom hook
 */
function usePage()
:[number, number, (p: number) => void, (p: number) => void] {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const _setPage = useCallback((p: number) => {
        setPage(p);
    }, [setPage]);
    const _setLastPage = useCallback((p: number) => {
        setLastPage(p);
    }, [setLastPage]);

    return [page, lastPage, _setPage, _setLastPage];
}

export default usePage;
