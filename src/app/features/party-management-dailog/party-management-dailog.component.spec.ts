import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyManagementDailogComponent } from './party-management-dailog.component';

describe('PartyManagementDailogComponent', () => {
  let component: PartyManagementDailogComponent;
  let fixture: ComponentFixture<PartyManagementDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyManagementDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyManagementDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
