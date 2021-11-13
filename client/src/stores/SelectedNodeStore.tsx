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

const selectedNodeStore = new SelectedNode();
export default selectedNodeStore;