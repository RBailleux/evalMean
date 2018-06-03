import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  loginFormIsVisible = true;
  registerFormIsVisible = false;

  toggleLoginFormVisibility()
  {
    this.loginFormIsVisible = !this.loginFormIsVisible;
    this.registerFormIsVisible = false;
  }
  toggleRegisterFormVisibility()
  {
    this.registerFormIsVisible = !this.registerFormIsVisible;
    this.loginFormIsVisible = false;
  }
}
