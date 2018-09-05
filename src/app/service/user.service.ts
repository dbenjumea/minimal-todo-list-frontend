import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Task} from '../entities/task';
import {User} from '../entities/user';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient) {
  }

  loginUser(username: string, password: string): Observable<User> {
    const loginUser = environment.apiUrl + '/user/' + username + '/' + password;
    return this.http.get<User>(loginUser);
  }

  saveTask(task: Task): Observable<Task> {
    const saveTaskUrl = environment.apiUrl + '/task/save';
    return this.http.post<Task>(saveTaskUrl, task);
  }

  deleteTask(id: number) {
    const deleteTaskUrl = environment.apiUrl + '/task/delete/' + id;
    this.http.delete(deleteTaskUrl);
  }
}
