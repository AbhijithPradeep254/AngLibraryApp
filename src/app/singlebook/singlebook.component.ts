import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookModel } from '../books/book.model';

@Component({
  selector: 'app-singlebook',
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  book: Object;

  ngOnInit(): void {
    this.book = this.bookService.GetBook();
  }
  

}
