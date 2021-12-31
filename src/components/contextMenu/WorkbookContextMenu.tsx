import React, { useState } from 'react';
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import SegmentIcon from '@mui/icons-material/Segment';

import WorkbookTitleModal from "../modal/WorkbookTitleModal";
import WorkbookDeleteModal from "../modal/WorkbookDeleteModal";
import WorkbookImageModal from "../modal/WorkbookImageModal";
import { WorkbookDB } from '../../models';
import useDialog from "../../hooks/useDialog";
import { useRouter } from "../../hooks/useRouter";
import * as Constants from "../../constants";

type Props = {
    data: WorkbookDB;
}

function WorkbookContextMenu(props: Props) {
    const { history } = useRouter();
    const [titleModalOpen, handleTitleModalOpen, handleTitleModalClose] = useDialog();
    const [deleteModalOpen, handleDeleteModalOpen, handleDeleteModalClose] = useDialog();
    const [imageModalOpen, handleImageModalOpen, handleImageModalClose] = useDialog();

    const goToEditPage = () => {
        history.push(`/workbook/edit/${props.data.id}`);
    };

    return (
        <div>
            <Menu id={props.data.id} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item onClick={goToEditPage}>
                   <ArticleIcon style={{ marginRight: 5 }} />
                    문제집 편집
                </Item>
                <Item onClick={handleTitleModalOpen}>
                  <SegmentIcon style={{ marginRight: 5 }} />
                    이름 바꾸기
                </Item>
                <Item onClick={handleImageModalOpen}>
                    <ImageIcon style={{ marginRight: 5 }} />
                    표지 바꾸기
                </Item>
                <Item onClick={handleDeleteModalOpen}>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    삭제하기
                </Item>
            </Menu>
            <WorkbookDeleteModal
                deleteTitle="삭제하기"
                data={props.data}
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
            />
            <WorkbookTitleModal 
                data={props.data}
                open={titleModalOpen}
                onClose={handleTitleModalClose}
            />
            <WorkbookImageModal 
                data={props.data}
                open={imageModalOpen}
                onClose={handleImageModalClose}
            />
        </div>
    );
}

export default WorkbookContextMenu;