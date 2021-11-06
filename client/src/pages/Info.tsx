import { Menu, Item, Separator, Submenu, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import TreeContextMenu from "../components/contextMenu/TreeContextMenu";

const MENU_ID = "menu-id";


function Info() {

    /* ContextMenu Test */
    const { show } = useContextMenu({
        id: MENU_ID
    });

    function displayMenu(e: any) {
        // put whatever custom logic you need
        // you can even decide to not display the Menu
        show(e);
    }

    return (
        <div>
            <div 
                style={{ 
                    backgroundColor: "black", 
                    width: 100, 
                    height: 100
                }}
                onContextMenu={displayMenu}
                >       
            </div>
            {/*<TreeContextMenu />*/}
            소개 페이지
        </div>
    );
}

export default Info;