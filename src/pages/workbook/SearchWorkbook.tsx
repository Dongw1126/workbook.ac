import React, { useState } from 'react';
import WorkSearchBar from "../../components/search/workbook/WorkbookSearchBar";
import WorkbookSearchResult from "../../components/search/workbook/WorkbookSearchResult";
import WorkbookSearchInit from "../../components/search/workbook/WorkbookSearchInit";
import MovePage from '../../components/search/workbook/MovePageInWorkbook';
import usePage from '../../hooks/usePage';

import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { WorkbookDB } from '../../models';

const fetcher = async (_query: string, paginationProducer?: any) => {
    const ret = await DataStore.query(WorkbookDB, c => c.title("contains", _query), paginationProducer);
    return ret;
}

const sorter = (s: any) => s.title(SortDirection.ASCENDING).createdAt(SortDirection.DESCENDING);

function SearchWorkbook() {
    const [query, setQuery] = useState('');
    const [page, lastPage, setPage, setLastPage] = usePage(0);

    const handleQuery = (str: string) => {
        setPage(0);
        setQuery(str);
    }

    return (
        <div style={{ margin: "auto" }}>
            <div style={{ width: "60%", margin: "auto", textAlign: "center" }}>
                <WorkSearchBar setQuery={handleQuery} />
            </div>
            <div>
                <br/>
                {query && <MovePage page={page} lastPage={lastPage} setPage={setPage}/>}
                <br/>
                {query ?
                    <div>
                        <br/>
                        <div style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
                            검색결과
                        </div>
                        <WorkbookSearchResult
                            editable={false}
                            key={query} query={query} 
                            page={page} setLastPage={setLastPage}
                            fetcher={fetcher}
                            sorter={sorter}
                            emptyMessage="😲 검색 결과가 없습니다!"
                        />
                    </div> : 
                    <WorkbookSearchInit />}
                <br/><br/>
                {query && <MovePage page={page} lastPage={lastPage} setPage={setPage}/>}
                <br/><br/>
            </div>
        </div>
    );
}

export default SearchWorkbook;