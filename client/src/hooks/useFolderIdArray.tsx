import { useState, useCallback } from 'react';
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../components/Types";
import * as Constants from "../constants"

function useFolderIdArray(initalData: NodeModel<ProblemData>[]): [boolean[], () => void] {
    const [folderIdArray, setFolderIdArray] = useState([false]);

    const updateFolderIdArray = useCallback(() => {
        console.log("updateFolderIdArray call");

        let newFolderArray = Array.from({length: Constants.MAX_FOLDER_NUM + 1}, () => false);
        initalData.forEach((element) => {
          let curr_id = 0;
          if (typeof element.id === 'number' && element.droppable) {
            curr_id = element.id;
            //console.log(curr_id)
          }
          newFolderArray[curr_id] = true;
        })
        setFolderIdArray(newFolderArray);
    }, [initalData]);

    return [folderIdArray, updateFolderIdArray];
}

export default useFolderIdArray;