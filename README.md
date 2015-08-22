# memelopers

**Motivation and stuffs**

The whole idea is for newbies to have a fun project to work on to show off their skills or just to take as reference if they want to make something
Feel free to [create issues](https://goo.gl/uEn4iR) and pull requests, all suggestions are welcome
Check [the trello board](https://goo.gl/5vwvsl), take any task you want and move it to doing. If somebody is working on something you want to work on, contact them and see if you can work together.

You can follow me on the twitters if you want to [@eatskolnikov](https://goo.gl/xLJyTm)

**Fun facts [aboot](http://goo.gl/i2KGaJ) some files**

- gruntfile.js
	I use grunt to run jshint, minify all assets(css, js, html) and make the publish of the app

- package.json
	The packages that grunt uses

- .htaccess
	I use it to force an https connection, make the url look pretty and add headers for expiration dates

- manifest.json
	Thanks to this mobile users will be prompted to install a shortcut to their home screen

Setup and installation
==============

Install nodejs
--------------
[Here](https://goo.gl/YcOsZP) you can check how to do so. There's an issue when installing node in ubuntu, check it out how to solve it [here](https://goo.gl/uSfZXo)

Open the command line and update npm
--------------
	npm install npm -g

**Before proceeding make sure you are in the project's root folder within the terminal**

Install npm packages
--------------
	npm install


Building
--------------
	grunt build

You can run the build task with this. It will validate js files and create a build folder where it will copy all the css, js, images and html minified.

Watching
--------------
	grunt watch

Watches any changes made to code files inside the src/ folder. If the watcher sees a change it starts the building procces

Testing
--------------
    IOU

## Considerations
 - You need to configure your server to point to the build folder
 - In order to be able to test the `serviceworker` you need to either point to localhost or [install a local ssl certificate](http://goo.gl/FLsWPK)