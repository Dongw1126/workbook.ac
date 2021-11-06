import { Menu, Item, Separator, Submenu } from "react-contexify";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../Types";
import * as Constants from "../../constants";


type Props = {
    node: NodeModel<ProblemData>;
};

function FolderContextMenu(props: Props) {
    function handleItemClick({ event, props, triggerEvent, data }: any) {
        console.log("handleItemClick called");
        
        console.log(event, props, triggerEvent, data);
    }

    return (
        <Menu id={Constants.FOLDER_CONTEXT_MENU_ID}>

        </Menu>
    );
}

export default FolderContextMenu;