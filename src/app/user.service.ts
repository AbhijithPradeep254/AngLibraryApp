import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user:any)
  {
    return this.http.post('http://localhost:8000/signup',{'user' : user})
    .subscribe(data => {console.log(data)});
  }

  loginUser()
  {
    return this.http.post('http://localhost:8000/login',{});
  }
}
