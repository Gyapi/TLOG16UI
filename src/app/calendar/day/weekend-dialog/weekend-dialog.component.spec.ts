import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendDialogComponent } from './weekend-dialog.component';

describe('WeekendDialogComponent', () => {
  let component: WeekendDialogComponent;
  let fixture: ComponentFixture<WeekendDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekendDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
