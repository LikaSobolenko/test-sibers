import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { User } from '../models';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  public displayedUsers: User[] = [];
  public searchText: string = '';

  constructor(private userService: UserService, 
    public router: Router) {}

  ngOnInit(): void {
    this.loadData(this.userService.getAllUsers());
  }

  private loadData(observable: Observable<User[]>): void {
    
    observable.subscribe({
      next: (data) => {
        this.users = data;
        this.displayedUsers = this.users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public applyFilter() {
    const term = this.searchText.toLowerCase();
    this.displayedUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term)
    );
  }

  public allUsers() {
    this.displayedUsers = this.users
  }

  selectUser(id: number): void {
    this.router.navigate(['/channels', id]);
  }
}