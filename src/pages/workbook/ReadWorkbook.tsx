import { useState, useEffect } from "react";
import { useRouter } from "../../hooks/useRouter";
import { CircularProgress } from "@mui/material";

import selectedNodeStore from "../../stores/SelectedNodeStore";
import Workbook from '../../components/workbook/Workbook';
import WorkbookCard from "../../components/workbook/WorkbookCard";
import * as Constants from "../../constants";

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
        try {
            const params = match.params as MatchParams

            workbookFetched = await DataStore.query(WorkbookDB, params.id);
            treeFetched = await DataStore.query(TreeDataDB, c =>
                c.workbookId("eq", params.id)
            );
        } catch (error) {
            setStatus(Constants.SEARCH_ERROR);
        }

        return [workbookFetched, treeFetched];
    }

    useEffect(() => {
        setStatus(Constants.SEARCH_LOADING);
        fetchData()
            .then(res => {
                setWorkbookData(res[0] as WorkbookDB);
                
                const resTree = res[1] as TreeDataDB[];
                if(resTree.length !== 0) setTreeData(resTree[0]);
                else setTreeData(undefined);

                setStatus(Constants.SEARCH_COMPLETE);
            })
        selectedNodeStore.setNode(undefined);
    }, [])

    if(status === Constants.SEARCH_LOADING) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    }
    else if (status === Constants.SEARCH_COMPLETE) {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <WorkbookCard editable={false} data={workbookData!} cursorDefault={true}/>
                </div>
                <div style={{ width: "60%", margin: "auto" }}>
                    <Workbook treeDB={treeData!} editable={false} />
                </div>
            </div>
        );
    }

    return (
        <div>
            error
        </div>
    );
}

export default ReadWorkbook;