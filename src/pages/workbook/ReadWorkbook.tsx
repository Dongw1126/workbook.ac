import { useState, useEffect } from "react";
import { useRouter } from "../../hooks/useRouter";
import { CircularProgress } from "@mui/material";

import selectedNodeStore from "../../stores/SelectedNodeStore";
import Workbook from '../../components/workbook/Workbook';
import WorkbookCard from "../../components/workbook/WorkbookCard";
import * as Constants from "../../constants";
import styles from "./ReadWorkbook.module.css";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB } from "../../models";

type MatchParams = {
    id: string;
}

/**
 * 문제집 둘러보기 - 문제집 읽기 컴포넌트
 */
function ReadWorkbook() {
    const { match } = useRouter();

    const [status, setStatus] = useState(Constants.SEARCH_LOADING);
    const [workbookData, setWorkbookData] = useState<WorkbookDB>();
    const [treeData, setTreeData] = useState<TreeDataDB>();

    const fetchData = async () => {
        let workbookFetched: WorkbookDB | undefined = undefined;
        let treeFetched: TreeDataDB[] = [];

        const params = match.params as MatchParams;

        workbookFetched = await DataStore.query(WorkbookDB, params.id);
        treeFetched = await DataStore.query(TreeDataDB, c =>
            c.workbookId("eq", params.id)
        );

        return [workbookFetched, treeFetched];
    }

    useEffect(() => {
        setStatus(Constants.SEARCH_LOADING);
        fetchData()
            .then(res => {
                setWorkbookData(res[0] as WorkbookDB);
                
                const resTree = res[1] as TreeDataDB[];
                if(resTree.length !== 0) {
                    setTreeData(resTree[0]);
                    setStatus(Constants.SEARCH_COMPLETE);
                }
                else {
                    setTreeData(undefined);
                    setStatus(Constants.SEARCH_ERROR);
                }  
            })
            .catch(() => {
                setStatus(Constants.SEARCH_ERROR);
            });
        selectedNodeStore.setNode(undefined);
    }, [])

    if(status === Constants.SEARCH_LOADING) {
        return (
            <div className={styles.progress}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    }
    else if (status === Constants.SEARCH_COMPLETE) {
        return (
            <div>
                <div className={styles.cardContainer}>
                    <WorkbookCard editable={false} data={workbookData!} cursorDefault={true}/>
                </div>
                {treeData?.treeData?.length !== 0 ? 
                    <div className={styles.workbookConatiner}>
                        <Workbook treeDB={treeData!} editable={false} />
                    </div> :
                    <div className={styles.emtpyText}>
                        <p>
                            빈 문제집 입니다
                        </p>
                    </div>
                }
            </div>
        );
    } else {
        return (
            <div className={styles.emtpyText}>
                <p>
                    <br/><br/>
                    해당하는 문제집이 없습니다...<br/><br/>
                    \( •︠_•︡ )/<br/>
                </p>
            </div>
        );
    }
}

export default ReadWorkbook;