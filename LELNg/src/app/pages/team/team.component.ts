import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { Symbol } from '../../shared/models/index';
import { LelProjectTeam } from '../../shared/models/lel-project-team';
import { MatDialog } from '@angular/material';
import { TeamInviteModalComponent } from './team-invite-modal/team-invite-modal.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: LelProjectTeam[];

  constructor(
    private route: ActivatedRoute,
    private lelProjectsService: LelProjectsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.lelProjectsService.getLelProjectTeam(+id).subscribe(
      (result) => {
        this.team = result;
      });
  }

  invite(): void {
    const dialogRef = this.dialog.open(TeamInviteModalComponent, {
      data: { team: this.team },
      width: '50%'
  });

  }

}
