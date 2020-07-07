import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreinforPage } from './moreinfor.page';

describe('MoreinforPage', () => {
  let component: MoreinforPage;
  let fixture: ComponentFixture<MoreinforPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreinforPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreinforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
