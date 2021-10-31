import React from "react";
import { Box } from "@mui/system";
import FolderIcon from "@mui/icons-material/Folder";
import * as Constants from "../constants"

type Props = {
  droppable?: boolean;
  level?: number;
  voteCnt?: number;
};


function TypedIcon(props: Props) {
  if (props.droppable) {
    return <FolderIcon />;
  }
  else {
    let tierLevel = "0";
    if (typeof props.level != "undefined") {
      tierLevel = String(props.level);
      if (props.level === 0 && props.voteCnt !== 0) {
        tierLevel = "nr";
      }
    }
    
    const tierUrl = Constants.SERVER_URL + "tier/svg/" + tierLevel + ".svg";
    return (
      <Box>
        <img src={tierUrl}
          alt=""
          style={{
            width: "1,2em",
            height: "1.2em",
            lineHeight: 'inherit',
            verticalAlign: 'middle'
          }} />
      </Box>
    );
  }
}

export default TypedIcon;