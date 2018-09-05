import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {HttpClient} from '@angular/common/http';
import {User} from './entities/user';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Task} from './entities/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'TODO List Application';
  // usernameFake = 'test';
  // passwordFake = 'pwd123';
  user: User;
  enableTodoList: boolean;
  closeResult: string;
  savedTask: Task;

  constructor(private http: HttpClient, private service: UserService, private modalService: NgbModal) {
  }

  loginUser(username: string, password: string) {
    this.service.loginUser(username, password).subscribe(
      response => {
        this.user = response;
        // if we write this if outside the subscribe, the first time we call the observable it will return undefined
        if (this.user.items.length > 0 && this.user.id != null) {
          this.enableTodoList = true;
        }
      }
    );
  }

  createTask(data) {
    const task: Task = {
      id: 0,
      title: '',
      description: '',
      days: 0,
      last_update: '',
      user: 0
    };

    task.title = data.title;
    task.description = data.description;
    task.days = parseInt(data.days, 10);
    task.user = this.user.id;

    this.service.saveTask(task).subscribe(
      response => {
        this.savedTask = response;
        if(this.savedTask !== undefined) {
          console.log('Task Added');
          this.loginUser(this.user.username, this.user.password);
        }
      }
    );
  }

  deleteTask(id: number) {
    this.service.deleteTask(id);
  }

  onClickSubmit(data) {
    this.loginUser(data.username, data.password);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
      this.createTask(1);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
