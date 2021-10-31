import React from "react";
import { Box } from "@mui/system";
import FolderIcon from "@mui/icons-material/Folder";
import * as Constants from "../../constants"

type Props = {
  droppable?: boolean;
  level?: number;
};


function TypedIcon(props: Props) {
  if (props.droppable) {
    return <FolderIcon />;
  }
  else {
    const tierUrl = Constants.SERVER_URL + "tier/svg/" + props.level + ".svg";
    return (
      <Box>
        <img src={tierUrl} 
        alt=""
        style={{
          width:"1,2em", 
          height:"1.2em", 
          lineHeight:'inherit', 
          verticalAlign:'middle'
        }}/>
      </Box>
    );
  }
}

export default TypedIcon;