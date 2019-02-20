import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (result) => {
        this.users = result;
      });
  }
}
