Setting up agera on your machine
====

- Make sure you have [node.js](http://nodejs.org/) and [npm](https://npmjs.org/) installed on your machine
- Navigate to the root directory of the repo and run
	1. `npm install -g yo`
	1. `npm install generator-angular`
	1. `npm install`
	1. `bower install`
	1. `grunt server`
- Make awesome

Deployment
----

Agera is deployed as part of the Goals app. Simply use the build.sh script to compile agera and copy it to the goals
project directory. The build.sh requires both the goals and agera projects be sibling directories for the copy to work.


Common Commands
----

* Start livereload server

		grunt serve

* Start server minified

		grunt serve:dist

* Install random JS plugin

		bower install <plugin name> --save

* Generate route

		yo angular:route <route name>

* Generate controller

		yo angular:controller <controller name> --coffee

* Generate view

		yo angular:view <view name>

Protips
----

- Make sure you don't have to npm install with sudo, something is weird with your installation if you do
- After you install any bower packages, or add any controllers manually without the generator, make sure you remember to link to them in the /index.html file.
- It looks like the route generator doesn't edit coffeescript very well, so double check app.coffee if you ever use that generator




Other useful resources
----

+ [JS Styleguide](https://github.com/nathanmosher/idiomatic.js)
+ [SASS/CSS Styleguide](https://github.com/nathanmosher/idiomatic-css)
+ [Angular Generator Docs](https://github.com/yeoman/generator-angular)
+ [Angular Docs](http://docs.angularjs.org/api/)
