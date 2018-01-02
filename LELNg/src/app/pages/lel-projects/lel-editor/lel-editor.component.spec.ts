import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LelEditorComponent } from './lel-editor.component';

describe('LelEditorComponent', () => {
  let component: LelEditorComponent;
  let fixture: ComponentFixture<LelEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LelEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
