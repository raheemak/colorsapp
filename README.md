# ColorsApp

This is an application built with MongoDB (on cloud- Atlas), React JS, and Node JS (Express). 

The functionality of the app is as follows: 
- Feature for users to add new group, person and color to the database (via an UI). If a person’s name already exists, replace the input color as the color for that person
- Feature for users to retrieve all people for a particular color. Color can be selected from a pre-populated drop down list retrieved from DB. If no color is selected, display all the people organized by color and group.

## View deployed app: 
https://colorsappraheema.herokuapp.com/

You can also run the app locally, explained below.

## Available Scripts

In the project directory, you can run the application locally: 

The first time you run the app: 
### `npm install`
### `cd client`
### `npm install`
### `cd ..`

Then: 
### `npm start`

Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### `npm test`

This will test the API calls in the backend server. 
You can also test the frontend: 
### `cd client`
### `npm test`

## Code Coverage

Code coverage for frontend: 89.61% of statements

<img width="654" alt="Screen Shot 2022-06-12 at 6 34 51 PM" src="https://user-images.githubusercontent.com/6608323/173433499-671679f6-6f3f-4823-acac-b24235588ba8.png">

Code coverage for backend: 88.88% of statements
<img width="638" alt="Screen Shot 2022-06-13 at 3 49 50 PM" src="https://user-images.githubusercontent.com/6608323/173433512-27ac67c2-1f2c-411c-b6cb-40a91ba47bbc.png">


## Assumptions

- Input json only needs to be read in the beginning, if you wish to use it, update the file and comment out the line in index.js 
- It is okay to display colors in lower case. This was done so that I could alleviate errors when use enters a new person/color 
- Do not need to validate if user entered color is a valid color 
- Object structure needed to stay the same in mongodb (could not use subdocuments). 
- Treat users with different capitals as the same user (ex: RaHeemA === Raheema)
- When updating a user color, if the group entered is different than their current group, disregard new group update and keep old group name. 
