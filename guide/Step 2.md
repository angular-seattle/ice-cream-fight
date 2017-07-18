# Step 2: Designing the App

For this app, we'll be using [Angular Material](http://material.angular.io), which provides a library
of well-designed components. To Install material, run

```
npm install --save @angular/material @angular/cdk
npm install --save @angular/animations
```

# Add Material Module

Edit `src/app.module.ts` and add the Angular Material modules.
It makes things a little more readable if you package all the
Angular Material modules in their own module, then import that
into your application module, like so

```ts
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
```

# Theming and global styles

Edit `src/styles.css` to choose a theme for your app. Styles
defined here will be available globally.

`src/app.component.ts` 

# Create the IceCreamTable component

```
ng generate component ice-cream-table
```

This creates a basic component setup in `src/app/ice-cream-table`. 
The components name is `app-ice-cream-table`, because all of our
components are prefixed with 'app'. You can configure this prefix
in Angular CLI, 'app' is just the default. Add the table to the
AppComponent like so:

```ts
<md-toolbar class="header" color="primary">
  <a href='/'><img class="logo" src="/assets/logo.png"></a>
  <span class="title">
    Ice Cream Fight!
  </span>
</md-toolbar>
<app-ice-cream-table> </app-ice-cream-table>
```