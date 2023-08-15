import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostComponent } from './all-post.component';

describe('AllPostComponent', () => {
  let component: AllPostComponent;
  let fixture: ComponentFixture<AllPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPostComponent]
    });
    fixture = TestBed.createComponent(AllPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
