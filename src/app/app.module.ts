import { BrowserModule } from '@angular/platform-browser';
import { MdCoreModule, MdTableModule, MdToolbarModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IceCreamTableComponent } from './ice-cream-table/ice-cream-table.component';

@NgModule({
  exports: [
    CdkTableModule,
    MdCoreModule,
    MdTableModule,
    MdToolbarModule
  ]
})
export class IceCreamMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    IceCreamTableComponent
  ],
  imports: [
    BrowserModule,
    IceCreamMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
