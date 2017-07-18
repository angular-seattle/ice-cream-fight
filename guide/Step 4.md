# Step 4: Connect to FireBase

Firebase is a collection of services, including real-time database. It has a free 
tier we can use, and it's great for simple applications with real-time requirements, 
like chat or voting.

## Set up FireBase

Go to [https://firebase.google.com/] and get started. Create a new project.
You should also install the firebase CLI tool

    npm install firebase --save

Under rules, allow anything for now

```json
{
  "rules": {
     ".read": true,
     ".write": true
  }
}
```

Import `initial-db.json` into your new database.

## Security

Firebase will only allow connections from authorized domains. Click "authentication", 
then "Sign-in Method", then make sure "Authorized Domains" only has two entries.

## Add AngularFire2

AngularFire2 is the official FireBase client for Angular. Read the [Developer Guide](https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md)

    npm install angularfire2 --save

Following the setup guide, find your project's connection information in Overview and
copy it to src/environments/environment.ts. You can then add AngularFire2 to your AppModule with

```ts
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
```

## Create the Flavor Service

    ng generate service flavor

```ts
  getFlavors() {
    const flavorList = this.db.list('/flavors', { query: { orderByChild: 'votes' } });
    return flavorList.map((array) => array.slice().reverse());
  }

  addVote(id: string) {
    const ref = this.db.database.ref(`/flavors/${id}/votes`);
    ref.transaction((currentVotes) => currentVotes + 1);
  }
```