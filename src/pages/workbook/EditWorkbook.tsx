import { useEffect, useState } from "react";
import Split from 'react-split'
import Workbook from '../../components/workbook/Workbook';
import ProblemSearch from '../../components/search/problem/ProblemSearch';
import { CircularProgress } from "@mui/material";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import * as Constants from "../../constants";
import { useRouter } from "../../hooks/useRouter";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB } from "../../models";

type MatchParams = {
    id: string;
}

function EditWorkbook() {
    const { match } = useRouter();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(Constants.SEARCH_LOADING);
    const [data, setData] = useState<TreeDataDB>();

    const fetchData = async () => {
        const params = match.params as MatchParams;

        const workbookFetched = await DataStore.query(WorkbookDB, params.id);
        const treeFetched = await DataStore.query(TreeDataDB, c =>
            c.workbookId("eq", params.id)
        );
        setTitle(workbookFetched ? workbookFetched.title : "");
        return treeFetched;
    }

    useEffect(() => {
        setStatus(Constants.SEARCH_LOADING);
        fetchData()
            .then((res) => {
                if(res.length !== 0) {
                    setData(res[0]);
                    setStatus(Constants.SEARCH_COMPLETE);
                }
                else {
                    setData(undefined);
                    setStatus(Constants.SEARCH_ERROR);
                } 
            })
            .catch(() => {
                setStatus(Constants.SEARCH_ERROR);
            });
    }, [])

    if (status === Constants.SEARCH_LOADING) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    }
    else if (status === Constants.SEARCH_COMPLETE) {
        return (
            <div>
                <div style={{ margin: "10px 0 10px 10px" }}>
                    <LoadingButton
                        style={{ borderRadius: 50, margin: "0 15px 0 0"}}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained">
                        저장
                    </LoadingButton>
                    <Button 
                        style={{ borderRadius: 50 }} 
                        variant="outlined"
                        startIcon={<CloseIcon/>}>
                        취소
                    </Button>
                </div>
                <div style={{ height: "100%" }}>
                    <Split
                        className="split"
                        sizes={[40, 60]}
                        minSize={300}
                        gutterSize={10}
                        cursor="col-resize"
                    >
                        <div>
                            {<Workbook treeDB={data!} editable={true} title={title}/>}
                        </div>
                        <div style={{ margin: 10 }}>
                            <ProblemSearch />
                        </div>
                    </Split>
                </div>
            </div>
        );
    }
    else {
        return(
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                <p>
                    <br />
                    😲 로드 중 오류가 발생했습니다!
                </p>
            </div>
        );
    }
}

export default EditWorkbook;