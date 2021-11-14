import { ProblemList, Tree } from "../components/types/Types";
import TreeTestData from "./TestData.json"
import * as Constants from "../constants";

test("ProblemList Constructor Test", () => {
    const problemList = new ProblemList();
    expect(problemList.idArray.length).toBe(Constants.MAX_FOLDER_NUM);
});

test("ProblemList setData Test", () => {
    const problemList = new ProblemList();
    problemList.setData(TreeTestData);
    expect(problemList.data).toEqual(TreeTestData);
});

test("ProblemList updateIdArray Test", () => {
    const problemList = new ProblemList();
    problemList.setData(TreeTestData);
    problemList.data.forEach((element) => {
        if (element.droppable) {
            expect(problemList.idArray[Number(element.id)]).toBeTruthy();
        }
    });

    problemList.setData(TreeTestData.slice(0, 2));
    problemList.data.forEach((element) => {
        if (element.droppable) {
            expect(problemList.idArray[Number(element.id)]).toBeTruthy();
        }
    });
});

test("ProblemList addFolder Test", () => {
    const problemList = new ProblemList();
    problemList.setData(TreeTestData);
    const beforeTree = new Tree(problemList.data);

    const element = problemList.data[0];

    const childLen = beforeTree.root[Number(element.id)].child.length;
    const newId = problemList.addFolder("tmp", element);
    const afterTree = new Tree(problemList.data);

    expect(afterTree.root[Number(element.id)].child.length).toBe(childLen + 1);
    expect(problemList.idArray[newId]).toBeTruthy();
});

test("ProblemList addFolder Limit Test", () => {
    const problemList = new ProblemList();
    problemList.setData([]);
    for(let i = 0; i < Constants.MAX_FOLDER_NUM; i++) {
        problemList.addFolder("tmp");
    }

    expect(problemList.addFolder("tmp")).toBe(-1);
});

test("ProblemList addProblem Test", () => {
    const problemList = new ProblemList();
    const id = 9876;
    const level = 1;
    const text = "tmp";

    let addSuccess = false;

    problemList.setData(TreeTestData);
    problemList.addProblem(id, level, text);
    problemList.data.forEach((element) => {
        if (element.id === 9876 && element.text == text && element.data?.level === level) {
            addSuccess = true;
        }
    });

    expect(addSuccess).toBeTruthy();
    expect(problemList.addProblem(id, level, text)).toBeFalsy();
});


test("ProblemList deleteNode Test", () => {
    const problemList = new ProblemList();
    problemList.setData(TreeTestData);
    
    const oldId = Number(problemList.data[0].id);
    let flag = true;

    problemList.deleteNode(problemList.data[0]);
    problemList.data.forEach((element) => {
        if(element.id === oldId || element.parent === oldId) {
            flag = false;
        }
    });

    expect(flag).toBeTruthy();
    expect(problemList.idArray[oldId]).toBeFalsy();
});