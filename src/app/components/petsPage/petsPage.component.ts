import { Component, OnInit } from '@angular/core';
import { PetInformationService } from 'src/app/services/petInformation.service';
import { Pet } from 'src/app/models/pet/pet';

@Component({
  selector: 'app-pet-page',
  templateUrl: './petsPage.component.html',
  styleUrls: ['./petsPage.component.css']
})
export class PetsPageComponent implements OnInit {

  catsOwnedByMales: Pet[] = [];
  catsOwnedByFemales: Pet[] = [];

  constructor(private petInformationService: PetInformationService) { }

  ngOnInit() {
    this.petInformationService.getPetOwners().subscribe(
      ownerList => {
        this.catsOwnedByMales = this.petInformationService
          .sortPetsByOwnerGenderAndType('Male', 'Cat', ownerList);

        this.catsOwnedByFemales = this.petInformationService
          .sortPetsByOwnerGenderAndType('Female', 'Cat', ownerList);
      }
    );
  }

}
