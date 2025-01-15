# Getting Started
Install the dependencies and run the project in watch mode
```
npm install
npm run build # or watch to rebuild on change
open index.html
```
Note that using Webpack is obselete and this archive has been provided
for compatibility reasons. Prefer using Vite, check it at https://vitejs.dev
## About Quizzly

The Quizzly App was developed as a project from scratch as part of the Scrimba frontend developer course. React, CSS and Javascript were
involved in the creation of this app. The app also makes use of the OMDb database to find questions and render them to the DOM. Several 
considerations were put in place such as adding a loading screen while the API data is fetched. Ensuring strict guards such as being 
unable to submit until all questions have been answered. There is also the ability to restart the game once the game has ended load up a new
set of questions. 
