import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerCompteComponent } from './supprimer-compte.component';

describe('SupprimerCompteComponent', () => {
  let component: SupprimerCompteComponent;
  let fixture: ComponentFixture<SupprimerCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerCompteComponent]
    });
    fixture = TestBed.createComponent(SupprimerCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
