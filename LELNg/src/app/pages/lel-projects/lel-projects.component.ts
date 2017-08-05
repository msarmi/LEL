import { Component, OnInit } from '@angular/core';
import { LelProjectsService } from '../../shared/services/lel-projects/lel-projects.service';
import { LELProject } from '../../shared/classes/lel-project';

@Component({
  selector: 'app-lel-projects',
  templateUrl: './lel-projects.component.html',
  styleUrls: ['./lel-projects.component.scss'],
  providers: [LelProjectsService]
})
export class LelProjectsComponent implements OnInit {
  lelProjects: LELProject[];

  constructor(private lelProjectsService: LelProjectsService) { }

  ngOnInit() {
    this.getLelProjects();
  }

  getLelProjects(): void {
    this.lelProjectsService.getLelProjects()
                            .then(lelProjects => 
                               this.lelProjects = lelProjects);
  }
}
