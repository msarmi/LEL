import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { SymbolComment } from '../../../shared/models/symbol-comment';
import { Observable, of, ReplaySubject } from "rxjs";
import { CommentService } from "../../../shared/services/comment/comment.service";
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { UsersService } from '../../../shared/services/users/users.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { SymbolsService } from '../../../shared/services/symbols/symbols.service';
@Component({
  selector: 'app-symbol-comments',
  templateUrl: './symbol-comments.component.html',
  styleUrls: ['./symbol-comments.component.css']
})
export class SymbolCommentsComponent implements OnInit {

  symbolId: number;
  comments$: Observable<SymbolComment[]>;
  currentComment: SymbolComment | null;
  currentContent: string;
  editing = false;
  comments: SymbolComment[];
  step = -1;
  currentReply: string;
  currentUserId: number;
  constructor(
    public dialogRef: MatDialogRef<SymbolCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService, 
    private symbolsService: SymbolsService,
    public dialog: MatDialog,
    public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.symbolId = this.data.symbolId;
    // this.commentService.getComments(this.data.symbolId).subscribe(result => this.comments = result);
    this.symbolsService.getComments(this.data.symbolId).subscribe(result => this.comments = result);
    this.currentUserId = this.authenticationService.getUser().id;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  remove(comment: SymbolComment) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { message: `Are you sure you want to delete this comment ?` }});
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.commentService.remove(comment).subscribe(() =>
            this.symbolsService.getComments(this.symbolId).subscribe(
              result => this.comments = result
            )
          );  
        }
      });
  }

  removeReply(comment: SymbolComment, reply: SymbolComment) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { message: `Are you sure you want to delete this reply ?` }});
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.commentService.remove(reply).subscribe(() =>
            this.symbolsService.getComments(this.symbolId).subscribe(
              result => this.comments = result
            )
          );          
        }
      });
  }

  reply(comment: SymbolComment, content: string) {
    if (this.currentReply) {
      const reply = new SymbolComment();
      reply.content = this.currentReply;
      // reply.symbolCommentReply = comment;      
      reply.userId = this.currentUserId;
      //reply.symbolId = this.symbolId;
      if (!comment.symbolComments) {
        comment.symbolComments = new Array<SymbolComment>();
      }
      comment.symbolComments.push(reply);
      // this.commentService.setComments(this.comments, this.symbolId).subscribe(
      //   result => this.comments = result
      // );
      this.symbolsService.setComments(this.comments, this.symbolId).subscribe(
        result => this.comments = result
      );
      this.currentReply = null;
    }
  }

  newComment() {
    if (this.currentContent) {
      const comment = new SymbolComment();
      comment.content = this.currentContent;
      comment.userId = this.currentUserId;
      comment.symbolId = this.symbolId;
      if (!this.comments) {
        this.comments = new Array<SymbolComment>();
      }
      this.comments.push(comment);
      // this.commentService.setComments(this.comments, this.symbolId).subscribe(
      //   result => this.comments = result
      // );
      this.symbolsService.setComments(this.comments, this.symbolId).subscribe(
        result => this.comments = result
      );
      this.currentContent = null;
    }
  }
}
