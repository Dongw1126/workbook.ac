import { makeAutoObservable } from 'mobx';

class Title {
    title: string = "무제 1";
    constructor() {
        makeAutoObservable(this);
    }
}

/** 문제집 제목 저장 */
const title = new Title();
export default title;