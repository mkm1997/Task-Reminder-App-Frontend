import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectoptionsComponent } from './selectoptions.component';

describe('SelectoptionsComponent', () => {
  let component: SelectoptionsComponent;
  let fixture: ComponentFixture<SelectoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
