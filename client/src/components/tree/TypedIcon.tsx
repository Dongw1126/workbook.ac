import React from "react";
import FolderIcon from "@mui/icons-material/Folder";

//TODO : tier icon
type Props = {
  droppable?: boolean;
  level?: number;
};

export const TypedIcon: React.FC<Props> = (props) => {
  if (props.droppable) {
    return <FolderIcon />;
  }
  else {
    switch (props.level) {
      // case "image": return <ImageIcon />;
      // case "csv": return <ListAltIcon />;
      // case "text": return <DescriptionIcon />;
      default: return null;
    }
  }
};