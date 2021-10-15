import React, { useState } from "react";
import { StylesProvider, ThemeProvider } from '@mui/styles';
import CssBaseLine from "@material-ui/core/CssBaseline";
import { Tree, NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "./Types";
import { ProblemNode } from "./ProblemNode";
import { theme } from "./ProblemTreeTheme";
import styles from "./ProblemTree.module.css";
import SampleData from "./sample.json";

function ProblemTree() {
  const [treeData, setTreeData] = useState<NodeModel<ProblemData>[]>(SampleData);
  const [idsText, setIdsText] = useState("");
  const [newOpenIds, setNewOpenIds] = useState<NodeModel["id"][]>([]);

  // const targetIds = idsText.trim() === "" ? [] : idsText.split(",").map((id) => Number(id.trim()));

  const handleDrop = (newTree: NodeModel<ProblemData>[]) => setTreeData(newTree);

  const handleChangeOpen = (newOpenIds: NodeModel["id"][]) => {
    setNewOpenIds(newOpenIds);
    console.log(newOpenIds);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <div className={styles.treeapp}>
          <Tree
            tree={treeData}
            rootId={0}
            render={(
              node: NodeModel<ProblemData>,
              { depth, isOpen, onToggle }
            ) => (
              <ProblemNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
              />
            )}
            onDrop={handleDrop}
            onChangeOpen={handleChangeOpen}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget
            }}
          />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default ProblemTree;
