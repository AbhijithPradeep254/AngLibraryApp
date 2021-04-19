import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-singleauthor',
  templateUrl: './singleauthor.component.html',
  styleUrls: ['./singleauthor.component.css']
})
export class SingleauthorComponent implements OnInit {

  constructor(private authorService: AuthorService, private activatedRoute: ActivatedRoute) { }

  author: any;
  id: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe(params =>
      {
        this.id = params.get('id');
      })
      this.author = this.authorService.authors[this.id];
  }

}
