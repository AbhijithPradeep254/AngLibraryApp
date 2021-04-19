import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SingleauthorComponent } from './singleauthor/singleauthor.component';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'books', component : BooksComponent, canActivate: [AuthGuard]},
  {path: 'authors', component : AuthorsComponent, canActivate: [AuthGuard]},
  {path: 'update', component : UpdateComponent, canActivate: [AuthGuard]},
  {path: 'books/:id', component: SinglebookComponent, canActivate: [AuthGuard]},
  {path: 'authors/:id', component: SingleauthorComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
