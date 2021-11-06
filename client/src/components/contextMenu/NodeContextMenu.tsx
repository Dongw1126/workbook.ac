import { Menu, Item, Separator, Submenu } from "react-contexify";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../Types";
import * as Constants from "../../constants";


type Props = {
    node: NodeModel<ProblemData>;
};

function NodeContextMenu(props: Props) {
    function handleItemClick({ event, props, triggerEvent, data }: any) {
        console.log("handleItemClick called");
        
        console.log(event, props, triggerEvent, data);
    }

    return (
        <Menu id={Constants.TREE_CONTEXT_MENU_ID}>
            <Item onClick={handleItemClick}>
                Item 1
            </Item>
            <Item onClick={handleItemClick}>
                Item 2
            </Item>
            <Separator />
            <Item disabled>Disabled</Item>
            <Separator />
            <Submenu label="Submenu">
                <Item onClick={handleItemClick}>
                    Sub Item 1
                </Item>
                <Item onClick={handleItemClick}>Sub Item 2</Item>
            </Submenu>
        </Menu>
    );
}

export default NodeContextMenu;