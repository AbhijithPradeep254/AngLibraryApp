import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserModel } from './user.model';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {   }
  
  userItem = new UserModel(null,null,null);
  confPassword: String = "";

  ngOnInit(): void {
  }

  AddUser()
  {
    if (this.userItem.password == this.confPassword)
    {
      const salt = bcrypt.genSaltSync(10);
      this.userItem.password = bcrypt.hashSync(this.userItem.password, salt);
      this.userService.addUser(this.userItem);
      alert("success");
      console.log(this.userItem);
      this.router.navigate(['/login']);
    }
    else
    {
      alert("Password confirmation does not match");
    }
  }

}
