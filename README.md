This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

# Activity Record

This app records your activities! No concept of users yet so this is a shared database (oops).

## **Things you can do**

- Add an activity
- Edit an activty
- Mark / unmark activity as complete
- Remove an activity

## **Shameful things that needs some explaining**

- Attempted to make an optimistic UI. The basics are there but needs way more UI stuff to be added so it's obvious to the users what's happening.
  - ~~Bug due to this is if you add then delete immediately without the activity syncing to Firebase~~ _fixed!_
- Haven't taken a look at all if layout is responsive :(
- Needs **major** refactoring. Like seriously..
  - ~~Using index for the keys so when deleting an activity with another activity below, the next activity will be open~~ _fixed!_
