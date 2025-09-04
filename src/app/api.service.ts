import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../app/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://hr2.sibers.com/test/frontend/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    console.log('API SERVISE')
    return this.http.get<User[]>(this.apiUrl);
  }
}
