import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetsPageComponent } from './components/petsPage/petsPage.component';
import { PetsListComponent } from './components/petsList/petsList.component';

@NgModule({
  declarations: [
    AppComponent,
    PetsPageComponent,
    PetsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
