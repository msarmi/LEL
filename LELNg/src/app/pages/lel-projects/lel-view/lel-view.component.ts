import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { LelProjectsService } from '../../../shared/services/lel-projects/lel-projects.service';
import { LELProject } from '../../../shared/models/index';

@Component({
  selector: 'app-lel-view',
  templateUrl: './lel-view.component.html',
  styleUrls: ['./lel-view.component.css']
})
export class LelViewComponent implements OnInit {

  lelProject: LELProject;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LelProjectsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getLelProject(+id).subscribe(lelProject => this.lelProject = lelProject);
  }

  gotoHeroes() {
    this.router.navigate(['/lelprojects']);
  }
}
