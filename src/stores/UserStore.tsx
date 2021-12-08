import { makeAutoObservable } from 'mobx';
import { Auth } from 'aws-amplify';

class UserStore {
    user: any;
    loggedIn: boolean;
    
    constructor() {
        makeAutoObservable(this);
        this.user = null;
        this.loggedIn = false;
    }

    setUser(_user: any) {
        this.user = _user;
    }
    getUser() {
        return this.user;
    }
    /*updateUser() {
        Auth.currentAuthenticatedUser()
            .then(user => { 
                this.user = user;
            })
            .catch(() => this.user = null);
        console.log(this.user);
    }*/

    login(_user: any) {
        this.setUser(_user);
        this.loggedIn = true;
        console.log("login called");
    }
    logout() {
        this.setUser(null);
        this.loggedIn = false;
        console.log("logout called");
    }
}

const userStore = new UserStore();
export default userStore;