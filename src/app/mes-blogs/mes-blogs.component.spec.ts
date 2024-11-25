import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesBlogsComponent } from './mes-blogs.component';

describe('MesBlogsComponent', () => {
  let component: MesBlogsComponent;
  let fixture: ComponentFixture<MesBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesBlogsComponent]
    });
    fixture = TestBed.createComponent(MesBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
