import { makeAutoObservable } from 'mobx';
import { NodeModel } from "@minoru/react-dnd-treeview";

class SelectedNode {
    node: NodeModel | undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }
    setNode(n: NodeModel | undefined) {
        this.node = n;
    }
    getNode() {
        return this.node;
    }
}

/** 문제집에서 선택된 노드 저장 */
const selectedNodeStore = new SelectedNode();
export default selectedNodeStore;