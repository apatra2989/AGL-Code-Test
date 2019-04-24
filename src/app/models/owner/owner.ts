import { Pet } from '../pet/pet';

export type Gender = 'Male' | 'Female';

export class Owner {
  name: string;
  gender: Gender;
  age: number;
  pets: Pet[];
}
