import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  userObj = JSON.parse(localStorage.getItem('user'));

  GetBooks()
  {
    return this.http.get("http://localhost:8000/books");
  }

  GetBook()
  {
    return this.http.get("http://localhost:8000/books/:id");
  }

  UpdateBook(book:any)
  {
    return this.http.post("http://localhost:8000/update",{'book': book, 'user': this.userObj})
    .subscribe(data => {console.log(data)});
  }

  DeleteBook(book:any)
  {
    return this.http.post("http://localhost:8000/delete", {'book': book});
  }

  filterFunc(array: Array<any>,filter: Object)
  {
    const filterKeys = Object.keys(filter);
    return array.filter(item =>
    {
      return filterKeys.every(key =>
        {
          return filter[key].includes(item[key]);
        })
    });
  }
}
