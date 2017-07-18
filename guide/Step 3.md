# Step 3: Adding the Data Table

Angular Material provides a nice data table component we can use. We
can find it in the [Angular Material](https://material.angular.io/components/table/overview 
) guide.

Copy the sample template and code into the IceCreamTableComponent.
Also rember to add any modules you need from Material to the AppModule.

# Add some fake data

The table will update automatically, but for the time being let's just use some
canned data.

```ts
const STATIC_DATA = [
  { 'votes': 20, 
    'imageUrl': '/assets/americone_dream.jpg', 
    'name': 'Americone Dream' },
  { 'votes': 10, 
     'imageUrl': '/assets/rocky_road.jpg', 
     'name': 'Rocky Road' }];
```