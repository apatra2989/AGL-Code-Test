import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PetInformationService } from './petInformation.service';
import { Owner } from '../models/owner/owner';
import { Pet } from '../models/pet/pet';

describe('PetInformationService', () => {
  let injector: TestBed;
  let service: PetInformationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PetInformationService]
    });

    injector = getTestBed();
    service = injector.get(PetInformationService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should get owners', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Fido', type: 'Dog' },
          { name: 'Fido', type: 'Cat' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 18,
        pets: [
          { name: 'Fido', type: 'Dog' },
          { name: 'Fido', type: 'Cat' },
          { name: 'Fido', type: 'Fish' },
        ]
      },
      {
        name: 'Max',
        gender: 'Male',
        age: 44,
        pets: [
          { name: 'Fido', type: 'Bird' },
        ]
      },
    ];

    service
      .getPetOwners()
      .subscribe((owners: Owner[]) => {
        expect(owners).toBe(mockOwners);
      });

    const mockReq = httpMock.expectOne(service.RESOURCE_URL);

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockOwners);
  });

  it('Should filter by pet type', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Fido', type: 'Dog' },
          { name: 'Mittens', type: 'Cat' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Feathers', type: 'Bird' },
          { name: 'Bubbles', type: 'Fish' },
        ]
      },
    ];

    service
      .getPetOwners()
      .subscribe((owners: Owner[]) => {
        // Only Cats
        const onlyBeCats = service
          .sortPetsByOwnerGenderAndType('Male', 'Cat', owners);
        expect(onlyBeCats.every((pet: Pet) => pet.type === 'Cat')).toBeTruthy();
        expect(onlyBeCats.every((pet: Pet) => pet.type === 'Dog')).toBeFalsy();

        // Only Dogs
        const onlyBeDogs = service
          .sortPetsByOwnerGenderAndType('Male', 'Dog', owners);
        expect(onlyBeDogs.every((pet: Pet) => pet.type === 'Dog')).toBeTruthy();
        expect(onlyBeDogs.every((pet: Pet) => pet.type === 'Bird')).toBeFalsy();

        // Only Birds
        const onlyBeBirds = service
          .sortPetsByOwnerGenderAndType('Female', 'Bird', owners);
        expect(onlyBeBirds.every((pet: Pet) => pet.type === 'Bird')).toBeTruthy();
        expect(onlyBeBirds.every((pet: Pet) => pet.type === 'Fish')).toBeFalsy();

        // Only Fish
        const onlyBeFish = service
          .sortPetsByOwnerGenderAndType('Female', 'Fish', owners);
        expect(onlyBeFish.every((pet: Pet) => pet.type === 'Fish')).toBeTruthy();
        expect(onlyBeFish.every((pet: Pet) => pet.type === 'Cat')).toBeFalsy();
      });

    const mockReq = httpMock.expectOne(service.RESOURCE_URL);
    mockReq.flush(mockOwners);
  });

  it('Should filter pets by owners gender', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Fido', type: 'Dog' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Boxer', type: 'Dog' },
        ]
      },
    ];

    service
      .getPetOwners()
      .subscribe((owners: Owner[]) => {
        // Only Pets of Owners That Are Male
        const onlyMaleOwnerPets = service
          .sortPetsByOwnerGenderAndType('Male', 'Dog', owners);
        expect(onlyMaleOwnerPets.every((pet: Pet) => pet.name === 'Fido')).toBeTruthy();
        expect(onlyMaleOwnerPets.every((pet: Pet) => pet.name === 'Boxer')).toBeFalsy();

        // Only Pets of Owners That Are Female
        const onlyFemaleOwnerPets = service
          .sortPetsByOwnerGenderAndType('Female', 'Dog', owners);
        expect(onlyFemaleOwnerPets.every((pet: Pet) => pet.name === 'Boxer')).toBeTruthy();
        expect(onlyFemaleOwnerPets.every((pet: Pet) => pet.name === 'Fido')).toBeFalsy();
      });

    const mockReq = httpMock.expectOne(service.RESOURCE_URL);
    mockReq.flush(mockOwners);
  });

  it('Should sort resulting pet list alphabetically', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Zaggy', type: 'Dog' },
          { name: 'Albert', type: 'Dog' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Mittens', type: 'Cat' },
          { name: 'Candy', type: 'Cat' },
        ]
      },
    ];

    const expectedMaleOwnedDogNames: string[] = [
      'Albert',
      'Zaggy',
    ];

    const expectedFemaleOwnedCatNames: string[] = [
      'Candy',
      'Mittens',
    ];

    service
      .getPetOwners()
      .subscribe((owners: Owner[]) => {
        // Pets of Male Owners Are Sorted Alphabetically
        const onlyMaleOwnedDogs = service
          .sortPetsByOwnerGenderAndType('Male', 'Dog', owners)
          .map((pet: Pet) => pet.name);
        expect(onlyMaleOwnedDogs).toEqual(expectedMaleOwnedDogNames);

        // Pets of Female Owners Are Sorted Alphabetically
        const onlyFemaleOwnedCats = service
          .sortPetsByOwnerGenderAndType('Female', 'Cat', owners)
          .map((pet: Pet) => pet.name);
        expect(onlyFemaleOwnedCats).toEqual(expectedFemaleOwnedCatNames);
      });

    const mockReq = httpMock.expectOne(service.RESOURCE_URL);
    mockReq.flush(mockOwners);
  });

  it('Should sort all cats alphabetically for both male and female owners', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Zaggy', type: 'Dog' },
          { name: 'Boxer', type: 'Cat' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Mittens', type: 'Cat' },
          { name: 'Feathers', type: 'Bird' },
        ]
      },
      {
        name: 'Darren',
        gender: 'Male',
        age: 54,
        pets: [
          { name: 'Sqwarky', type: 'Bird' },
          { name: 'Albert', type: 'Cat' },
        ]
      },
      {
        name: 'Carly',
        gender: 'Female',
        age: 22,
        pets: [
          { name: 'Fluffykins', type: 'Cat' },
          { name: 'Bubbles', type: 'Fish' },
        ]
      },
    ];

    const expectedMaleOwnedCatNames: string[] = [
      'Albert',
      'Boxer',
    ];

    const expectedFemaleOwnedCatNames: string[] = [
      'Fluffykins',
      'Mittens',
    ];

    service
      .getPetOwners()
      .subscribe((owners: Owner[]) => {
        // Cats of Male Owners Are Sorted Alphabetically
        const onlyMaleOwnedCats = service
          .sortPetsByOwnerGenderAndType('Male', 'Cat', owners)
          .map((pet: Pet) => pet.name);
        expect(onlyMaleOwnedCats).toEqual(expectedMaleOwnedCatNames);

        // Cats of Female Owners Are Sorted Alphabetically
        const onlyFemaleOwnedCats = service
          .sortPetsByOwnerGenderAndType('Female', 'Cat', owners)
          .map((pet: Pet) => pet.name);
        expect(onlyFemaleOwnedCats).toEqual(expectedFemaleOwnedCatNames);
      });

    const mockReq = httpMock.expectOne(service.RESOURCE_URL);
    mockReq.flush(mockOwners);
  });
});
