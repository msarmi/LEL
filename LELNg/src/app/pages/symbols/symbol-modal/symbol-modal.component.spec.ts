import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolModalComponent } from './symbol-modal.component';

describe('SymbolModalComponent', () => {
  let component: SymbolModalComponent;
  let fixture: ComponentFixture<SymbolModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
