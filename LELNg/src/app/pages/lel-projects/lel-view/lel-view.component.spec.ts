import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LelViewComponent } from './lel-view.component';

describe('LelViewComponent', () => {
  let component: LelViewComponent;
  let fixture: ComponentFixture<LelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
