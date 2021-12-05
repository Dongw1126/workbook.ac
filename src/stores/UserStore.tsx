import { makeAutoObservable } from 'mobx';
import { Auth, Hub } from 'aws-amplify';

class UserStore {
    user: any;
    constructor() {
        makeAutoObservable(this);
        this.user = null;
        this.updateUser();
    }
    updateUser() {
        Auth.currentAuthenticatedUser()
            .then(user => { 
                this.user = user;
                console.log(user);
            })
            .catch(() => this.user = null);
    }
}

const userStore = new UserStore();
export default userStore;