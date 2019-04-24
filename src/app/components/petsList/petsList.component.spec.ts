import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsListComponent } from './petsList.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Pet } from 'src/app/models/pet/pet';

describe('ListComponent', () => {
  let component: PetsListComponent;
  let fixture: ComponentFixture<PetsListComponent>;
  let titleElement: DebugElement;
  let listElement: DebugElement;

  const pets: Pet[] = [
    { name: 'Solomon', type: 'Fish' },
    { name: 'Eagle', type: 'Bird' },
    { name: 'Tom', type: 'Dog' },
    { name: 'Mao', type: 'Cat' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    titleElement = fixture.debugElement.query(By.css('h3'));
    listElement = fixture.debugElement.query(By.css('ol'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render title', () => {
    let titleText = '';
    component.title = titleText;
    fixture.detectChanges();
    expect(titleElement.nativeElement.innerHTML === titleText).toBeTruthy();
    expect(titleElement.nativeElement.innerHTML === 'Male').toBeFalsy();

    titleText = 'Male';
    component.title = titleText;
    fixture.detectChanges();
    expect(titleElement.nativeElement.innerHTML === titleText).toBeTruthy();
    expect(titleElement.nativeElement.innerHTML === 'Female').toBeFalsy();

    titleText = 'Female';
    component.title = titleText;
    fixture.detectChanges();
    expect(titleElement.nativeElement.innerHTML === titleText).toBeTruthy();
    expect(titleElement.nativeElement.innerHTML === '').toBeFalsy();
  });

  it('Should render list', () => {
    expect(listElement.nativeElement.childElementCount).toBe(0);

    component.pets = pets;
    fixture.detectChanges();
    expect(listElement.nativeElement.childElementCount).toBe(pets.length);
  });

  it('Should render list items', () => {
    component.pets = pets;
    fixture.detectChanges();

    // Do the list elements match the expected pet names?
    expect(listElement.nativeElement.children[0].innerHTML).toBe(pets[0].name);
    expect(listElement.nativeElement.children[1].innerHTML).toBe(pets[1].name);
    expect(listElement.nativeElement.children[2].innerHTML).toBe(pets[2].name);
    expect(listElement.nativeElement.children[3].innerHTML).toBe(pets[3].name);
  });
});
