import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { NavigationUtil } from '../../utils/navigation.util';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  async onLogin() {
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      NavigationUtil.navigate('home');
    } catch (error) {
      this.set('errorMessage', error.message);
    }
  }

  async onSignUp() {
    try {
      await this.authService.signUp(this.email, this.password);
      NavigationUtil.navigate('profile-setup');
    } catch (error) {
      this.set('errorMessage', error.message);
    }
  }
}