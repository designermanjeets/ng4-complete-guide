import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    token: String;

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            reponse => {
                this.router.navigate(['/']);
                firebase.auth().currentUser.getToken().
                    then(
                    (token: string) => this.token = token
                    );
            }
        )
            .catch(
            error => console.log(error)
            );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token);

        // beware this stored token might be expired !
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}
