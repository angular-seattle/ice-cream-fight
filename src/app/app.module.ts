import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdCoreModule, MdTableModule, MdToolbarModule, MdSnackBarModule, MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IceCreamTableComponent } from './ice-cream-table/ice-cream-table.component';
import { FlavorService } from './flavor.service';
import { NewFlavorComponent } from './new-flavor/new-flavor.component';

export const appRoutes: Routes = [
  {
    path: 'new',
    component: NewFlavorComponent,
  },
  {
    path: 'flavors',
    component: IceCreamTableComponent,
  },
  {
    path: '',
    redirectTo: '/flavors',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [
    CdkTableModule,
    MdButtonModule,
    MdCoreModule,
    MdTableModule,
    MdSnackBarModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule
  ]
})
export class IceCreamMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    IceCreamTableComponent,
    NewFlavorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    IceCreamMaterialModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [FlavorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
