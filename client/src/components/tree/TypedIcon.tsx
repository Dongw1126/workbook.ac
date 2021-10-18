import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";

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