import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelslistComponent } from './channelslist.component';

describe('ChannelslistComponent', () => {
  let component: ChannelslistComponent;
  let fixture: ComponentFixture<ChannelslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
