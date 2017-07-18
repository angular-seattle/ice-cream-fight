# Step 5: Add Animations

Our list updates really fast, and it can be kind of hard to see what's going on. We can make
it a little more friendly with animations. We'll be using the new animations feature
in Angular 4.

## Setup

Follow the [Quickstart example](https://angular.io/guide/animations#quickstart-example-transitioning-between-two-states). Animations allow you to define a state for a dom element, and the transitions between that state.

## Define an animation

```ts
  animations: [
    trigger('pulse', [
      state('enabled', style({ background: 'white' })),
      transition('void => enabled', [
        style({ background: 'lightseagreen' }),
        animate('350ms ease-out')
      ]),
    ])
  ]
```

Elements always transition from the 'void' state when they're added. Our table readds elements
when they change, so 'void => *' would trigger whenever a row changes.

## In the template
Bind the animation to the row like so

```ts
<md-row [@pulse]="pulseState" *cdkRowDef="let row; columns: displayedColumns;"></md-row>
```

The [@pulse] syntax binds a trigger to a property on the component instance. The property it's
bound to defines the value for the 'state' in the transition.

## Disable animations

When the page first loads, all of the list elements are added, which can cause a distracting flash. To fix thes, `pulseState` starts with a value that won't trigger the animation. We only
enable it after 3 seconds, an arbitrarily chosen delay.

```ts
this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
    // The callback needs to be run inside the Angular zone so the change
    // is picked up.
    this.ngZone.run(() => this.pulseState = 'enabled');
    }, 3000);
});
```