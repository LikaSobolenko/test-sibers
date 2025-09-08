import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewchannelComponent } from './newchannel.component';

describe('NewchannelComponent', () => {
  let component: NewchannelComponent;
  let fixture: ComponentFixture<NewchannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewchannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewchannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
