import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { Symbol } from '../../shared/models/index';
import { LelProjectTeam } from '../../shared/models/lel-project-team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: LelProjectTeam[];

  constructor(
    private route: ActivatedRoute,
    private lelProjectsService: LelProjectsService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.lelProjectsService.getLelProjectTeam(+id).subscribe(
      (result) => {
        this.team = result;
      });
  }

  invite() {

  }

}
