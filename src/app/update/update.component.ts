import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookModel } from '../books/book.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  bookItem = new BookModel;
  buttonValue:String = "";

  ngOnInit(): void {
  }

  UpdateBook()
  {
    this.bookItem.img = this.bookItem.img.slice(12);
    this.bookService.UpdateBook(this.bookItem);
    alert("success");
    this.router.navigate(['/books']);
    console.log(this.bookItem);
  }

  DeleteBook()
  {
    this.bookService.DeleteBook(this.bookItem);
    this.router.navigate(['/books']);
  }
}