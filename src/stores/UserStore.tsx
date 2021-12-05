import { makeAutoObservable } from 'mobx';
import { Auth, Hub } from 'aws-amplify';

class UserStore {
    user: any;
    constructor() {
        makeAutoObservable(this);
        this.user = null;
        this.updateUser();

        Hub.listen('auth', data => {
            switch (data.payload.event) {
                case 'signIn':
                    userStore.user = data.payload.data;
                    console.log("sign in");
                    break;
                case 'signOut':
                    userStore.user = null;
                    console.log("sign out");
                    break;
            }
        });
    }
    updateUser() {
        Auth.currentAuthenticatedUser()
            .then(user => { 
                this.user = user;
                console.log(user);
            })
            .catch(() => this.user = null);
        console.log(this.user);
    }
}

const userStore = new UserStore();
export default userStore;