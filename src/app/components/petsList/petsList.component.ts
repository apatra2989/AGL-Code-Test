import { Component, OnInit, Input } from '@angular/core';
import { Pet } from 'src/app/models/pet/pet';

@Component({
  selector: 'app-pet-list',
  templateUrl: './petsList.component.html',
  styleUrls: ['./petsList.component.css']
})
export class PetsListComponent implements OnInit {

  @Input() title: string;
  @Input() pets: Pet[];

  constructor() { }

  ngOnInit() { }
}
