import { Menu, Item } from "react-contexify";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { NodeModel } from "@minoru/react-dnd-treeview";


import * as Utils from "../tree/ProblemTreeUtils";
import { ProblemData } from "../Types";
import * as Constants from "../../constants";


type Props = {
    treeData: NodeModel<ProblemData>[];
    setTreeData: React.Dispatch<React.SetStateAction<NodeModel<ProblemData>[]>>;
    node?: NodeModel;
};

function FolderContextMenu(props: Props) {
    const addFolder = () => {
        console.log("addFolder called");
        console.log(props.node);
        
        const newFolder = Utils.getNewFolder(props.treeData, props.node);
        console.log(newFolder.id);

        if(newFolder.id === -1) {
          console.log("폴더 꽉 참");
          return;
        }

        props.setTreeData(prevData => [...prevData, newFolder]);
    }

    return (
        <Menu id={Constants.FOLDER_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX}}>
            <Item onClick={addFolder}>
                <AddIcon style={{ marginRight: 5 }}/>
                폴더 추가
            </Item>
            <Item hidden={(typeof props.node === "undefined")} >
                <DeleteForeverIcon style={{ marginRight: 5 }}/>
                폴더 삭제
            </Item>     
        </Menu>
    );
}

export default FolderContextMenu;