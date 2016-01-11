# Feed Reader Testing

## Context

This project is a simple feed reader webapp that is tested using [Jasmine] (http://jasmine.github.io/). Different tests are written to ensure that core functionalities work as expected. It is part of the [Web Developper Front-End Nanodegree] (https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001) at Udacity.

## Usage

You can find all tests in feedreader.js. If you want to run the tests yourself, just clone or fork this project and open index.html, the Jasmine results will appear at the bottom of the page. 

## Additional Tests

The additional tests test a new feature that would make it possible to add a new feed to the the 4 default feeds. 

In the DOM it is assumed that an icon (with class .add-menu-icon) is created that when clicked makes an add menu appear. As in the case of the menu, the add menu visibility is controlled by a class of the body: .add-menu-hidden. The test suite "The add menu" checks that the add-menu is toggled correctly when clicking on the add menu icon.

It is also assumed that in the future app an addFeed function is written that is responsible for adding a new feed. The add menu could typically contain a form asking for a feed url, and when submitting the form the addFeed function would be called. When passed a valid url feed, addFeed should add a new entry to the allFeeds array and a new feed to the feed list (with class .feed-list). These requirements are tested in the test suite "Adding a valid new feed".

When the user enters an invalid feed url, no entry should be added to allFeeds. This is tested by the test suite "Adding an unvalid new feed".