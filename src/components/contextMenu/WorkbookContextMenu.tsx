import React, { useState } from 'react';
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { WorkbookData } from '../../types/Types';
import useDialog from "../../hooks/useDialog";
import * as Constants from "../../constants";

type Props = {
    data: WorkbookData;
}

function WorkbookContextMenu(props: Props) {
    return (
        <div>
            <Menu id={Constants.WORKBOOK_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item>
                    문제집 편집
                </Item>
                <Item>
                    이름 바꾸기
                </Item>
                <Item>
                    사진 바꾸기
                </Item>
                <Item>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    삭제하기
                </Item>
            </Menu>
        </div>
    );
}

export default WorkbookContextMenu;