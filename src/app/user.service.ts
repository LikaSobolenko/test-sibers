import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../app/models';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor(private apiService: ApiService) {}

  //Get all users from api
  getAllUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      return of(this.users);
    }

    return this.apiService.getUsers().pipe(
      map(users => {
        this.users = users.map(user => ({
          ...user,
          online: Math.random() > 0.5 
        }));
        return this.users;
      })
    );
  }

  //Get user by ID
  getUserById(id: number): Observable<User | undefined> {
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.id === id))
    );
  }
}
