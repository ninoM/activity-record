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

- Attempted to make an [optimistic UI](https://uxplanet.org/optimistic-1000-34d9eefe4c05?gi=c53ec13ae552). The basics are there but needs way more UI stuff to be added, so it's obvious to the users what's happening.
  - ~~Bug due to this is if you add then delete immediately without the activity syncing to Firebase~~ _fixed!_
- Haven't taken a look at all if layout is responsive
- No network handling whatsoever so some crashes might occur due to network hiccups.
- Needs **major** refactoring. Like seriously..
  - ~~Using index for the keys so when deleting an activity with another activity below, the next activity will be open~~ _fixed!_
  - More abstraction for components will result in cleaner code.
  - UI / Layout

## Total working hours: _60h (two and a half days)_

## **Screenshots**

![Landing page](https://i.imgur.com/mbVXbtx.png)
![View details](https://i.imgur.com/UoJbqhv.png)
![Add activty](https://i.imgur.com/bCNqRQQ.png)
![Date time picker](https://i.imgur.com/KbWS8lV.png)
