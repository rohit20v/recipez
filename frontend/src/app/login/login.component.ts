import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

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


  constructor(private http: HttpClient, private router: Router) {
  }

  userLogin() {
    if (this.formData.valid) {
      const loginData = {
        email: this.formData.value.email,
        password: this.formData.value.password
      };
      this.http.post('http://localhost:3000/user/login', loginData).subscribe(
        response => {
          this.router.navigate(['/']);
        },
        error => {
          console.error('Login error', error);
          alert('Invalid email or password');
        }
      );
    } else {
      alert("Invalid email or password");
    }
  }
}
