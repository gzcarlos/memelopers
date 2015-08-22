# memelopers

**Fun facts [aboot](http://goo.gl/i2KGaJ) files and stuff**

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