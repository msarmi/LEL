import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LelProjectsComponent } from './lel-projects.component';

describe('LelProjectsComponent', () => {
  let component: LelProjectsComponent;
  let fixture: ComponentFixture<LelProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LelProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LelProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
