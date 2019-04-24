import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsPageComponent } from './petsPage.component';
import { PetsListComponent } from '../petsList/petsList.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PetComponent', () => {
  let component: PetsPageComponent;
  let fixture: ComponentFixture<PetsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PetsPageComponent, PetsListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
