import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink, ReactiveFormsModule, HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  constructor(private authService: AuthService) {
  }

  userLogin() {
    if (this.formData.valid) {
      const {email, password} = this.formData.value;
      try {
        this.authService.login(email as string, password as string);

      } catch (err) {
        console.log(err)
      }
    } else {
      alert("Invalid email or password");
    }
  }
}
