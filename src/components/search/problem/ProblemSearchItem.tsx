import React from "react";
import { Observer } from "mobx-react";
import styles from "./ProblemSearchItem.module.css";
import TypedIcon from "../../../types/TypedIcon";
import ProblemDisplay from "../../../types/TypedText";
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';

import AlertModal from "../../modal/AlertModal";
import useDialog from '../../../hooks/useDialog';
import problemListStore from "../../../stores/ProblemListStore";
import selectedNodeStore from "../../../stores/SelectedNodeStore";
import * as Constants from "../../../constants";

type Props = {
    level: number;
    id: number;
    title: string;
    voteCnt: number;
};

/**
 * 결과 아이템 컴포넌트
 */
function ProblemSearchItem(props: Props) {
    const problemList = problemListStore;
    const selectedNode = selectedNodeStore;
    const [dupAlertOpen, handleDupAlertOpen, handleDupAlertClose] = useDialog();
    const [limitAlertOpen, handleLimitAlertOpen, handleLimitAlertClose] = useDialog();

    const handleAddClick = (e: React.MouseEvent) => {
        if(problemList.problemNum >= Constants.MAX_PROBLEM_NUM) {
            handleLimitAlertOpen();
        } else {
            const flag = problemList.addProblem(props.id, props.level, props.title, props.voteCnt, selectedNode.node);
            if (!flag) {
                handleDupAlertOpen();
            }
        }
    }

    const url = "https://www.acmicpc.net/problem/" + props.id;

    return (
        <Observer>
            {() => (<div className={`${styles.root}`}>
                <IconButton onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
                <div className={styles.itemSpacing}>
                    <TypedIcon droppable={false} level={props.level} voteCnt={props.voteCnt} />
                </div>
                <div className={styles.itemSpacing}>
                    <ProblemDisplay droppable={false} id={props.id} title={props.title} />
                </div>
                <IconButton onClick={() => window.open(url, "_blank")}>
                    <LaunchIcon />
                </IconButton>
                <AlertModal
                    title="알림"
                    content="이미 존재하는 문제입니다!"
                    open={dupAlertOpen}
                    onClose={handleDupAlertClose}
                />
                <AlertModal
                    title="알림"
                    content="문제는 최대 150개까지 저장 가능합니다!"
                    open={limitAlertOpen}
                    onClose={handleLimitAlertClose}
                />
            </div>)}
        </Observer>
    );
}

export default ProblemSearchItem;
