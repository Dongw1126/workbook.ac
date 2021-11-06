import { Menu, Item } from "react-contexify";
import { NodeModel } from "@minoru/react-dnd-treeview";


import * as Utils from "../tree/ProblemTreeUtils";
import { ProblemData } from "../Types";
import * as Constants from "../../constants";


type Props = {
    treeData: NodeModel<ProblemData>[];
    setTreeData: React.Dispatch<React.SetStateAction<NodeModel<ProblemData>[]>>;
    node?: NodeModel;
};

function TreeContextMenu(props: Props) {
    function addFolder() {
        console.log("addFolder called");
        
        const newFolder = Utils.getNewFolder(props.treeData, props.node);
        console.log(newFolder.id);

        if(newFolder.id === -1) {
          console.log("폴더 꽉 참");
          return;
        }

        props.setTreeData(prevData => [...prevData, newFolder]);
    }
    // Node hover랑 z_index 충돌하는 거 수정
    return (
        <Menu id={Constants.TREE_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX}}>
            <Item onClick={addFolder}>
                폴더 추가
            </Item>
        </Menu>
    );
}

export default TreeContextMenu;