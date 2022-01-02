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

    async updateUser() {
        await Auth.currentAuthenticatedUser()
            .then(user => { 
                this.login(user);
                console.log(user);
            })
            .catch(() => this.logout());
    }

    checkUsername(_name: string) {
        if(!this.user || (this.user.username !== _name)) {
            return false;
        } else {
            return true;
        }
    }
}

const userStore = new UserStore();
export default userStore;