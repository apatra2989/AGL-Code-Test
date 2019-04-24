import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsPageComponent } from './components/petsPage/petsPage.component';

const routes: Routes = [
  { path: '', component: PetsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
