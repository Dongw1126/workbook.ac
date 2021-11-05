import { useState, useCallback } from 'react';
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../components/Types";
import * as Constants from "../constants"

export function useIdArray(initalData: NodeModel<ProblemData>[]): [boolean[], () => void] {
    const [idArray, setIdArray] = useState([false]);

    const updateIdArray = useCallback(() => {
        console.log("updateFolderIdArray call");

        let newFolderArray = Array.from({length: Constants.MAX_FOLDER_NUM}, () => false);
        initalData.forEach((element) => {
          let curr_id = 0;
          if (typeof element.id === 'number' && element.droppable) {
            curr_id = element.id;
            //console.log(curr_id)
          }
          newFolderArray[curr_id] = true;
        })
        setIdArray(newFolderArray);
    }, [initalData]);

    return [idArray, updateIdArray];
}