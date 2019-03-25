import { Component, OnInit} from '@angular/core';
import { User } from '../../../shared/models';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';


@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

  user: User;
  userId: number;
  repeatPassword: string;

  constructor(
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<UserEditorComponent>) { }

  ngOnInit() {
    this.userId = this.authenticationService.getUser().id;
    this.authenticationService.get(this.userId).subscribe( (response) => this.user = response);    
  }

  updateUserData() {
    this.authenticationService.update(this.user).subscribe(response => this.user = response);
    this.dialogRef.close();
  }

}
