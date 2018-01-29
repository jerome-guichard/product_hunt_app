# product_hunt_app
Product Hunt Application

## Overview

This application displays all the posts posted on Product Hunt.

## Prerequisites

### Git

- Install git

### Node.js and Tools

- Get Node.js here https://nodejs.org/en/
- Install the tool dependencies: `npm install`

###
- You also need a token from Product hunt
- You can ask for it here : https://api.producthunt.com/v1/docs
### App setup

- Download the app from github
```
git clone https://github.com/jerome-guichard/product_hunt_app.git
```
```
git checkout master
```

- Import the project into your favorite  IDE or open a console and cd .../ProductHuntApp
- Import tools needed with the following command:
```
npm install
```
- Import dependencies of the project:
```
bower install
```
In app.config.js file, provide your token to the variable 'dev_token' 
- Start the app:
```
npm run-script start
```
Finally, open a browser and go to the following url:
```
http://localhost:8000/index.html
```