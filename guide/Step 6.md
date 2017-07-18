# Step 6: Limit Vote Rate

We've added voting to our app, but people can just spam the vote button. Part of our
requirements is that a person only be able to vote for a single flavor once every second
or so. This might normally be a somewhat complicated piece of logic, but it's easy to do with
reactive programming.

## Reactive Programming

Reactive programming is a way to organize how state changes in your application. You start
by treating events (user input, network requests, etc) as a stream of events. Libraries like
RxJS provide tools for manipulating these streams which can make it easy to add features like
debounce and retries to your app.

[The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

[RxJS Intro](http://reactivex.io/rxjs/manual/overview.html)

## Limiting click events

In RxJS, an _Observable_ is a stream of events that you can subscribe to. You'll get a callback
every time the value changes (ie, every time there's a new event). A _subject_ is a stream you
can write that can multicast to multiple Observers.

We can turn a click on the vote button into a stream of events by creating a subject and 
changing our `addVote()` callback to

```ts
ngOnDestroy() {
  this.voteSub.unsubscribe();
}
```

And in the init method for our component:
```ts
    this.vote$.asObservable().throttleTime(VOTE_DELAY).subscribe(() => {
      this.service.addVote(id);
    });
```

The [throttleTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttleTime) operator
ignores events that occur more often than the given delay. This means that we'll simple ignore
every click after the first one for VOTE_DELAY milliseconds.

## Using groupBy