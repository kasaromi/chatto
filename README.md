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

## Stretch Goals

* Make usernames
* The ability to create rooms/private messaging
* See a list of users who are available online
* Add “{user} is typing” functionality
* Emoji chat faces

## Resources
* [Socket](http://socket.io/)
* [Redis](http://redis.io/)
* [Heroku](https://www.heroku.com/)
* [Jasmin](http://jasmine.github.io/)
* [Tape](https://www.npmjs.com/package/tape)
* [Istanbul](https://github.com/gotwarlost/istanbul)
