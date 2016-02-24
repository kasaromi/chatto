# Chatto

![](https://travis-ci.org/kasaromi/chatto.svg?branch=master)
[![Codecrystal](https://img.shields.io/badge/code-crystal-5CB3FF.svg)](http://codecrystal.herokuapp.com/crystalise/katbow/kasaromi/chatto)
[![Code Climate](https://codeclimate.com/repos/56cc4edcafbada638e007c7f/badges/c91bce951f2025bb637d/gpa.svg)](https://codeclimate.com/repos/56cc4edcafbada638e007c7f/feed)
[![Test Coverage](https://codeclimate.com/repos/56cc4edcafbada638e007c7f/badges/c91bce951f2025bb637d/coverage.svg)](https://codeclimate.com/repos/56cc4edcafbada638e007c7f/coverage)
[![Issue Count](https://codeclimate.com/repos/56cc4edcafbada638e007c7f/badges/c91bce951f2025bb637d/issue_count.svg)](https://codeclimate.com/repos/56cc4edcafbada638e007c7f/feed)

This application is a chat room that updates in real time.

![](https://cloud.githubusercontent.com/assets/15983736/13251298/33da2638-da27-11e5-8f9a-903f8667530a.png)

### Implementation used

* ```socket.io```, for real time messages
* ```Redis```, to store the messages
* ```Heroku```, to deploy the app
* FrontEnd testing with ```Jasmin```
* Backend testing with ```tape```
* ```Istanbul``` - at least 80% coverage on backend.

### Stretch Goals

* Make usernames
* The ability to create rooms/private messaging
* See a list of users who are available online
* Add “{user} is typing” functionality
* Emoji chat faces

### Resources
* [Socket](http://socket.io/)
* [Redis](http://redis.io/)
* [Heroku](https://www.heroku.com/)
* [Jasmin](http://jasmine.github.io/)
* [Tape](https://www.npmjs.com/package/tape)
* [Istanbul](https://github.com/gotwarlost/istanbul)

# How we are going to do it

When a user joins a chat room they can login/sign up by choosing a username

This username will be linked to their messages for when they post them - both in the dom and in our database

![](https://cloud.githubusercontent.com/assets/15983736/13268390/218639b0-da7a-11e5-9b66-9ea31ffe2c0c.png)

### When a user logs in

When they click submit for loggin in, the name be sent to the server which will store this in the database
It will also initiate socket.io to display 'user' has joined Chatto.

This submit will also retrieve the entire database for all messages and all current users useing a xhr request

![](https://cloud.githubusercontent.com/assets/15983736/13269233/9d32ff18-da7e-11e5-9435-f77c9517651b.png)

This will be appended to the chatbox div in the dom with the messages that match your username on the left and all other usernames on the right

We will then rely on socket.io to feed them live chat from all users and live information for when users connect

### When a user sends a message

![](https://cloud.githubusercontent.com/assets/15983736/13269513/fd2bdf06-da7f-11e5-9bf7-3764ddb00618.png)
