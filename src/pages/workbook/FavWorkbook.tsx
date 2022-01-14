import React, { useEffect } from 'react';
import { observer } from "mobx-react";

import UserStore from "../../stores/UserStore";
import { myPageChangeFlag } from "../../stores/DataChangeFlagStore";
import * as Constants from "../../constants";
import WorkbookSearchResult from "../../components/search/workbook/WorkbookSearchResult";
import MovePage from '../../components/search/workbook/MovePageInWorkbook';
import usePage from '../../hooks/usePage';

import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { WorkbookDB, FavoriteDB } from "../../models";

/**
 * 좋아요 문제집 보기 페이지
 */
function FavWorkbook() {
    const userStore = UserStore;
    const flag = myPageChangeFlag.flag;

    const [page, lastPage, setPage, setLastPage] = usePage(0);

    const fetcher = async (_query: string, paginationProducer?: any) => {
        let result: WorkbookDB[] = [];
        const myUsername = userStore.getUser().username;
        const favId = await DataStore.query(FavoriteDB, c => c.username("eq", myUsername), paginationProducer);

        if(favId.length > 0 ) {
            result = await DataStore.query(WorkbookDB, (c) =>
                c.or((c) => favId.reduce((c, f) => c.id("eq", f.workbookId), c)), {
                    sort: s => s.title(SortDirection.ASCENDING)
                }
            );
        }

        return result;
    }

    const fetchData = async () => {
        let myFavorite: WorkbookDB[] = []

        const myUsername = userStore.getUser().username;
        
        const favId = await DataStore.query(FavoriteDB, c => c.username("eq", myUsername), {
            page: 0,
            limit: Constants.SEARCH_WORKBOOK_LOAD_NUM
        });

        if(favId.length > 0 ) {
            myFavorite = await DataStore.query(WorkbookDB, (c) =>
                c.or((c) => favId.reduce((c, f) => c.id("eq", f.workbookId), c)), {
                    sort: s => s.title(SortDirection.ASCENDING)
                }
            );
        }

        return myFavorite;
    };  

    useEffect(() => {
        // console.log();
    }, [userStore.loggedIn, flag]);


    if (userStore.loggedIn) {
        return (
            <div>
                <div style={{ textAlign: "center", margin: "2rem 0", marginTop: "3rem", fontSize: "3rem", fontWeight: 700 }}>
                    좋아요 한 문제집
                </div>
                <div>
                    <WorkbookSearchResult
                        key={flag}
                        editable={false} 
                        animated={true}
                        query=''
                        page={page} setLastPage={setLastPage}
                        fetcher={fetcher}
                        emptyMessage='좋아요 한 문제집이 없습니다.'
                    />
                    <div style={{ marginTop: "3rem", marginBottom: "5rem" }}>
                        <MovePage page={page} lastPage={lastPage} setPage={setPage}/>
                    </div>
                </div>
            </div >
        );
    }
    else {
        return (
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                <p>
                    <br /><br /><br /><br />
                    로그인이 필요합니다.<br /><br />
                </p>
            </div>
        );
    }
}

export default observer(FavWorkbook);