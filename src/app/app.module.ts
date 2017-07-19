import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { MdCoreModule, MdTableModule, MdToolbarModule, MdIconModule, MdButtonModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { IceCreamTableComponent } from './ice-cream-table/ice-cream-table.component';
import { FlavorService } from './flavor.service';
import { NewFlavorComponent } from './new-flavor/new-flavor.component';

@NgModule({
  exports: [
    CdkTableModule,
    MdButtonModule,
    MdCoreModule,
    MdTableModule,
    MdIconModule,
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
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    IceCreamMaterialModule
  ],
  providers: [FlavorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
