import { Tree } from "../components/types/Types";
import TreeTestData from "./TestData.json";
import * as Constants from "../constants";

test("Tree Constructor Test", () => {
    const t = new Tree(TreeTestData);
    const arr = Array.from({length: Constants.MAX_FOLDER_NUM}, () => 0);
    TreeTestData.forEach((element) => {
        arr[Number(element.parent)]++;
    });

    for(let i = 0; i < Constants.MAX_FOLDER_NUM; i++) {
        expect(t.root[i].child.length).toBe(arr[i]);
    }
});