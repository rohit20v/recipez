import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private router: Router) { }

  userSignIn() {
    if (this.formData.valid) {
      const userData = this.formData.value;
      this.http.post('http://localhost:3000/user', userData).subscribe(
        response => {
          this.router.navigate(['/login'])
        },
        error => {
          console.error('Signup error', error);
        }
      );
    } else {
      alert("Please enter valid email and password");
    }
  }
}
