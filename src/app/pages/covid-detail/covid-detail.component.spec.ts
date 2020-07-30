import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDetailComponent } from './covid-detail.component';

describe('CovidDetailComponent', () => {
  let component: CovidDetailComponent;
  let fixture: ComponentFixture<CovidDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
