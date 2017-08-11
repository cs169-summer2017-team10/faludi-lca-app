# Focus LCA Web App

[![Build Status](https://travis-ci.org/cs169-summer2017-team10/focus-lca-webapp.svg?branch=master)](https://travis-ci.org/cs169-summer2017-team10/focus-lca-webapp) <a href="https://codeclimate.com/github/cs169-summer2017-team10/focus-lca-webapp"><img src="https://codeclimate.com/github/cs169-summer2017-team10/focus-lca-webapp/badges/gpa.svg" /></a> <a href="https://codeclimate.com/github/cs169-summer2017-team10/focus-lca-webapp/coverage"><img src="https://codeclimate.com/github/cs169-summer2017-team10/focus-lca-webapp/badges/coverage.svg" /></a>

## Description

This website is meant to facilitate engineers in measuring the environmental impact of their products.
A simple, easy to use UI will allow the users to easily add information about their products (parts, materials, shipping methods) which will then be analyzed and displayed with numerous graphs.

Heroku deployment: https://focus-lca-summer2017.herokuapp.com

## Requirements

This project was initially implemented only with Ruby on Rails to manage both the backend and the frontend, as well as some JavaScript code.<br />
In this iteration, we decided to separate the two, and since this app relies heavily on JavaScript code, we used AngularJS for the frontend and Rails only for the backend.<br />
You can find some helpful links and resources at the end of this README to understand how the Rails pipeline can work with Bower and the installation of frameworks, libraries or dependencies such as AngularJS.

### Install Ruby and Rails

Guide: http://railsapps.github.io/installrubyonrails-mac.html

### Install Node and NPM

Guide: http://blog.teamtreehouse.com/install-node-js-npm-mac

### Install Bower

`npm install -g bower`

## Building and running the app

```bash
$ git clone https://github.com/cs169-summer2017-team10/focus-lca-webapp.git
$ cd focus-lca-webapp
$ bundle install --without production
$ rails db:setup
$ rake bower:install
$ rails s
```

## Project hierarchy

### Frontend (AngularJS)
```
└── app/
    ├── assets/
    │   ├── images/
    │   │   └── ...
    │   ├── javascripts/
    │   │   ├── controllers/
    │   │   │   └── ...
    │   │   ├── directives/
    │   │   │   └── ...
    │   │   ├── views/
    │   │   │   └── ...
    │   │   ├── app.js
    │   │   ├── application.js
    │   │   └── routes.js
    │   └── stylesheets/
    │       └── application.scss
    │
    └── views/
        └── application/
            └── index.html.erb
```

### Backend (Ruby on Rails)
```
└── app/
    ├── controllers/
    │   ├── application_controller.rb
    │   ├── assemblies_controller.rb
    │   └── users_controller.rb
    │
    ├── models/
    │   ├── assembly.rb
    │   └── user.rb
    │
    └── serializers/
        └── user_serializer.rb
```

## Resources

* [Setting Up an Angular SPA on Rails with Devise and Bootstrap](https://www.sitepoint.com/setting-up-an-angular-spa-on-rails-with-devise-and-bootstrap/)
* [Learn to Build Modern Web Apps with AngularJS and Ruby on Rails](https://thinkster.io/tutorials/angular-rails)
* [Deploying Rails + Bower on Heroku](https://medium.com/for-the-public-benefit/deploying-rails-bower-on-heroku-3b4ca4908a59)

## Troubleshooting

* [Integrating AngularJS with the Rails Asset Pipeline](https://thinkster.io/tutorials/angular-rails/integrating-angularjs-with-the-rails-asset-pipeline)
* [Unknown provider error when deploying Rails/AngularJS app to Heroku](https://stackoverflow.com/questions/13608039/unknown-provider-error-when-deploying-rails-angularjs-app-to-heroku)
* [Rails asset pipeline: Why things break in production and what precompilation does to your assets](https://makandracards.com/makandra/8951-rails-asset-pipeline-why-things-break-in-production-and-what-precompilation-does-to-your-assets)

## Misc

[Pivotal Tracker Project](https://www.pivotaltracker.com/n/projects/2070305)

[Faludi Design's website](http://www.faludidesign.com/)
