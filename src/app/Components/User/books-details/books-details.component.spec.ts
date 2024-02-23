import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDetailsComponent } from './books-details.component';

describe('BooksDetailsComponent', () => {
  let component: BooksDetailsComponent;
  let fixture: ComponentFixture<BooksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
