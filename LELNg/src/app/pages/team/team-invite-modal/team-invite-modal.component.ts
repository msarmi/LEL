import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models';
import { UsersService } from '../../../shared/services/users/users.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-team-invite-modal',
  templateUrl: './team-invite-modal.component.html',
  styleUrls: ['./team-invite-modal.component.css']
})
export class TeamInviteModalComponent implements OnInit {

  users: User[];
  $users: Observable<User[]>;
  userToInvite: User;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.$users = this.userService.getUsers();
  }

}
