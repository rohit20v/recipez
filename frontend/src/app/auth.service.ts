import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }


  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/user/login', {email, password}).subscribe({
      next: user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      },
      error: error => {
        throw error
      }
    })
  }

  get getCurrentUserId() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).user.id : null;
  }
  get getCurrentUsername() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).user.email : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
