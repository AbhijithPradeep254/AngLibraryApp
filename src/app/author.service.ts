import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  authors = 
  [
      {
          _id: 0,
          name : "Antoine de Saint-Exupéry",
          nationality : "France",
          img : "antoine.jpg"
      },
      {
          _id: 1,
          name : "Charles Dickens",
          nationality : "England",
          img : "charles.jpg"
      },
      {
          _id: 2,
          name : "J.R.R. Tolkien",
          nationality : "England",
          img : "tolk.jpg"
      },
      {
          _id: 3, 
          name : "Neil Gaiman",
          nationality : "England",
          img : "neil.jpg"
      },
      {
          _id: 4,
          name : "Rick Riordan",
          nationality : "U.S.A",
          img : "rick.jpg"
      }
  ];

  GetAuthor()
  {
    return this.http.get("http://localhost:8000/authors/:id");
  }
}
