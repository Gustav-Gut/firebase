import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  async login(email: string, pass: string) {
    try {
      const respoAuth = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, pass);
      console.log('respuesta auth -->', respoAuth);
      return respoAuth.user.uid;
    } catch (error) {
      console.error('error auth -->', error);
    }
  }

  async logout() {
    try {
      const logoutResp = await this.angularFireAuth.auth.signOut();
      console.log('logout exitoso');
      return logoutResp;
    } catch (error) {
      console.error('logout error -->', error);
      return error;
    }
  }

  async currentUSer() {
    try {
      const currentUser = this.angularFireAuth.auth.currentUser;
      return currentUser;
    } catch (error) {
      return error;
    }
  }
}
