import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Split from 'react-split'
import { CircularProgress } from "@mui/material";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { useRouter } from "../../hooks/useRouter";
import useDialog from "../../hooks/useDialog";
import AlertModal from "../../components/modal/AlertModal";
import Workbook from '../../components/workbook/Workbook';
import ProblemSearch from '../../components/search/problem/ProblemSearch';
import ProblemListStore from "../../stores/ProblemListStore";
import UserStore from "../../stores/UserStore";
import * as Constants from "../../constants";

import { DataStore } from '@aws-amplify/datastore';
import { WorkbookDB, TreeDataDB } from "../../models";

type MatchParams = {
    id: string;
}

function EditWorkbook() {
    const { match } = useRouter();
    const problemList = ProblemListStore;
    const userStore = UserStore;

    const [alertOpen, handleAlertOpen, handleAlertClose] = useDialog();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(Constants.SEARCH_LOADING);
    const [data, setData] = useState<TreeDataDB>();
    const [error, setError] = useState("");

    const checkUser = (_author: string) => {
        const currentUser = userStore.getUser();

        if(!currentUser || (currentUser.username != _author)) {
            const errMessage = "오류: 권한 없음"
            setError(errMessage);
            setStatus(Constants.SEARCH_ERROR);
            throw new Error(errMessage);
        }
        
        return null;
    }

    const fetchData = async () => {
        const params = match.params as MatchParams;    

        const workbookFetched = await DataStore.query(WorkbookDB, params.id);
        
        // 편집 권한 체크
        const checkUserResult = workbookFetched ? checkUser(workbookFetched.author) : null;
        if(checkUserResult) {
            return checkUserResult;
        }

        const treeFetched = await DataStore.query(TreeDataDB, c =>
            c.workbookId("eq", params.id)
        );
        setTitle(workbookFetched ? workbookFetched.title : "");
        return treeFetched;
    }

    const saveTreeData = async (_data: TreeDataDB | undefined) => {
        if(typeof _data !== "undefined") {
            await DataStore.save(TreeDataDB.copyOf(_data, item => {
                item.treeData = JSON.stringify(problemList.data);
            }));
        }
    }

    const handleSaveClick = () => {
        setLoading(true);
        fetchData()
            .then((res) => saveTreeData(res[0]))
            .then(() => {
                setLoading(false);
                handleAlertOpen();
            })
            .catch(() => alert("저장 중 오류가 발생했습니다"));
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
            .catch((err) => console.log(err.message));
    }, [userStore.user]);

    if (status === Constants.SEARCH_LOADING) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    }
    else if (status === Constants.SEARCH_COMPLETE) {
        return (
            <>
                <div>
                    <div style={{ margin: "10px 0 10px 10px" }}>
                        <LoadingButton
                            style={{ borderRadius: 50, margin: "0 15px 0 0"}}
                            loading={loading}
                            disabled={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveClick}
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
                <AlertModal
                    title=""
                    content="저장 완료!"
                    open={alertOpen} 
                    onClose={handleAlertClose}
                />
            </>
        );
    }
    else {
        return(
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                <p>
                    <br />
                    😲 로드 중 오류가 발생했습니다!<br/>
                    {error}
                </p>
            </div>
        );
    }
}

export default observer(EditWorkbook);