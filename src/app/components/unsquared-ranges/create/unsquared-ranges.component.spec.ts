import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsquaredRangesComponent } from './unsquared-ranges.component';

describe('UnsquaredRangesComponent', () => {
  let component: UnsquaredRangesComponent;
  let fixture: ComponentFixture<UnsquaredRangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsquaredRangesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsquaredRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
