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

  getUserById(id: number): Observable<User | undefined> {
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  getUsersByIds(ids: number[]): User[] {
    return this.users.filter(user => ids.includes(user.id));
  }

  searchUsers(searchTerm: string): User[] {
    if (!searchTerm.trim()) return [];
    
    return this.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
