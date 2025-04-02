import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategoriesComponent } from './child-categories.component';

describe('ChildCategoriesComponent', () => {
  let component: ChildCategoriesComponent;
  let fixture: ComponentFixture<ChildCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
