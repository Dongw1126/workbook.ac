import { makeAutoObservable } from 'mobx';

class DataChangeFlag {
    flag: number;
    constructor() {
        makeAutoObservable(this);
        this.flag = 0;
    }
    effect() {
        this.flag = (this.flag + 1) % 10;
    }
}

/** 데이터 생성, 삭제 시 리렌더링을 위한 객체 */
const dataChangeFlag = new DataChangeFlag();
export default dataChangeFlag;