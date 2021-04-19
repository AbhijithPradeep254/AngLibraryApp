import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookModel } from './book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private bookService: BookService) { }
  
  books: BookModel[];

  ngOnInit(): void {
    this.bookService.GetBooks()
    .subscribe(data =>
      {
        this.books = this.bookService.filterFunc(JSON.parse(JSON.stringify(data)), {user: (JSON.parse(localStorage.getItem('user')).username)});
      });
  }

}
