
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender, Owner } from 'src/app/models/owner/owner';
import { Pet, PetType } from 'src/app/models/pet/pet';

@Injectable({
  providedIn: 'root'
})
export class PetInformationService {

  RESOURCE_URL = 'http://agl-developer-test.azurewebsites.net/people.json';

  constructor(private http: HttpClient) { }

  public getPetOwners(): Observable<Owner[]> {
    return this.http.get(this.RESOURCE_URL) as Observable<Owner[]>;
  }

  public sortPetsByOwnerGenderAndType(gender: Gender, petType: PetType, ownerList: Owner[]): Pet[] {
    return ownerList
      .filter((owner: Owner) => owner.gender === gender)
      .reduce((petList: Pet[], curr: Owner) => {
        petList.push(...curr.pets);
        return petList;
      }, [] as Pet[])
      .filter((pet: Pet) => pet.type === petType)
      .sort((petX: Pet, petY: Pet) => petX.name.localeCompare(petY.name));
  }
}
