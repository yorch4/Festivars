import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router) { }

    getUserState() {
      return this.afAuth.authState;
    }

    isAuth() {
      return this.afAuth.authState.pipe(map(auth => auth));
    }

    login(email:string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/home']);
        }
      })
    }

    createUser(user) {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
        .then(() => {
          this.router.navigate(['/home']);
        });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      })
    }

    insertUserData(userCredential: firebase.auth.UserCredential) {
      var sexo;
      if($('#hombre').is(":checked")) {
        sexo = "Hombre";
      } else {
        sexo = "Mujer";
      }
      return this.db.doc(`Users/${userCredential.user.uid}`).set({
        email: this.newUser.email,
        firstname: this.newUser.firstName,
        lastname: this.newUser.lastName,
        country: $('#country').val(),
        sex: sexo
      })
    }

    logout() {
      this.router.navigate(['/login']);
      return this.afAuth.auth.signOut();
    }

}
