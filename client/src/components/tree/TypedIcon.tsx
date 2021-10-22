import React from "react";
import { Box } from "@mui/system";
import FolderIcon from "@mui/icons-material/Folder";
import * as Constants from "../../constants"

type Props = {
  droppable?: boolean;
  level?: number;
};


export const TypedIcon: React.FC<Props> = (props) => {
  // const tier = props.level ? props.level : -1;
  if (props.droppable) {
    return <FolderIcon />;
  }
  else {
    if (props.level) {
      const tierUrl = Constants.SERVER_URL + "tier/svg/" + props.level + ".svg";
      return (
        <Box>
          <img src={tierUrl} 
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
  return null;
};