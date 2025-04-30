import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsquaredRangesComponentView } from './unsquared-ranges.component';

describe('UnsquaredRangesComponent', () => {
  let component: UnsquaredRangesComponentView;
  let fixture: ComponentFixture<UnsquaredRangesComponentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsquaredRangesComponentView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsquaredRangesComponentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
