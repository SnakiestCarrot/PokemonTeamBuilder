# Pokemon team builder

Made by Casper Johansson, August Wikdahl, Filip Boive and Alexander Larsson

## Setting up the project

You will need node.js for npm commands to work.

To set up the project and then run it use `npm install` and `npm run dev`.

## User-visible-component

In the inspectView.jsx file we have implemented a component of RadarChart type, a PolarGrid. This is the component that displays a dynamic chart depending on what pokemon the user is inspecting and its stats. 
The component was taken from recharts.org.

## The general file strucuture of our project is as follows:

We have a src folder that contains the views and presenters folders. It also contains the files necessary for firebase to connect and work as well as the actual model itself. In the views folder we have the views of our application, they are what actually render the interface that the user sees. The presenters folder contains all the presenters between the views and model.

We also have the reactjs folder that contains the root and index of the whole project, much like in the labs during the tutorial weeks.

Now for explanation of each file in our current project:

## Presenters

These files are made to be the communication layer between the js model and the react views. They mostly handle sending data and functions back and forth.

### browsePresenter.jsx
The presenter responsible for presenting the list of all user teams.

### inspectPresenter.jsx:
A presenter for the pokemon inspect interface. This is the presenter for the view that shows when pressing the inspect button in the team builder view and other areas of the project.

### mainPresenter.jsx:
Presenter for the initial landing page of the project, the main page so to speak.

### minigamePresenter.jsx
The presenter for the minigame. 

### myTeamsPresenter.jsx:
The presenter for the my teams view.

### teamBuilderPresenter.jsx:
The presenter for the view that handles the teambuilding component of our project. 

### topBarPresenter.jsx:
The presenter for the topbar that is always showing at the top of the screen. This topbar is crucial for the navigation of our application.

## reactjs files

### index.jsx
In this file is where the root is created and some initializtion for the project is made on startup. 

### ReactRoot.jsx
This file creates the root for our html document, and is essential for the navigation in our app as it contains the router that routes the user to different webpages depending on the url. 

## Views

These files are responsible for rendering the page and therefore is all that the user "sees".

### inspectView.jsx
This view handles the interface for the inspect screen of a certain pokemon. It displays the basic stats of a pokemon as well as its types.

### mainView.jsx
This view handles the interface for the main landing page of the project, this is the first view that a new user will see.

### minigameView.jsx
A minigame that allows users to guess on advantages between pokemons. Includes both the game and 

### myTeamsView.jsx
This view will show the users teams if they are logged in and display them. The view should also make it possible to edit old teams and then save the changes.

### resultView.jsx
The result view is one part of the teambuilder page, it only displays the search results for the search query in the teambuilder page. This view also makes it possible to add and inspect pokemon.

### searchView.jsx
The search view is responsible for displaying the search bar and other eventual functionality of the teambuilder page.

### teamBuilderView.jsx
This view is responsible for displaying the current team the user is editing and making removal of pokemon from the team possible.

### teamEditorView.jsx
This view is a slight variation of the teambuilder view only used to edit a specific team.

### notificationView.jsx 
The popups that tells a user if a pokemon has been added or removed to the team in editor or teambuilder.

### topBarView.jsx
This view is what is always displayed at the top of the page and is used as the main form of navigation in our project. Also handles login/logout.

## Other files 

### firebaseConfig.js
This file handles the configuration for the firebase functionality of the project.

### firebaseModel.js
Handles requests to and from firebase within our project.

### PokemonModel.js
This is the model file for our entire project, here the state of the application is kept, with current pokemon, current team and lots of other data. This is what we update when a user triggers some event or alike that should modify data or state of the app.

### pokemonSource.js
This file handles the API calls we do, so it should exlusively be the model making calls to this file and fetching different data, like the stats of a certain pokemon for example.

### resolvePromise.js
This is a copied file from the tutorial week that helps with resolving API call promises, might be removed eventually if the need is not there anymore.

### styles.css
The css file defining the color scheme and styling of our entire project.

### utilities.js
Contains certain helper functions to the model to make the model less cluttered.

