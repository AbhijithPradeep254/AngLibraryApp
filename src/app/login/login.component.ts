import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
   }

   user = {
    username:'',
    password: ''
  };

  ngOnInit(): void {
  }

  LoginUser()
  {
    this.authService.LoginUser(this.user)
    .subscribe(res =>
      {
        if (res.isValid)
        {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.userDb));
          alert(res.msg);
          this.router.navigate(['/books']);
        }
        else
        {
          alert(res.msg);
        }
      });
  }
}
