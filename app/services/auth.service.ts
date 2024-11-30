import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import { Observable, EventData } from '@nativescript/core';

export class AuthService extends Observable {
  private static instance: AuthService;
  public currentUser: any = null;

  private constructor() {
    super();
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user;
      this.notify({ eventName: 'userChanged', object: this });
    });
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async signUp(email: string, password: string) {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      throw error;
    }
  }
}