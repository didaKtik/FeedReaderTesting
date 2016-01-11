/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		it('have non-empty urls', function () {
			haveNonEmpty('url');
		});

		it('have non-empty names', function () {
			haveNonEmpty('name');
		});

		function haveNonEmpty (property) {
			allFeeds.forEach(function (feed) {
				var prop = feed[property];
				expect(prop).toBeDefined();
				expect(typeof prop).toBe('string');
				expect(prop).not.toBe('');
			});
		}
	});


	describe('The menu', function () {
		var menuIcon;

		beforeAll(function () {
			menuIcon = $('.menu-icon-link');
		});

		it('is hidden by default', function () {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		it('displays when clicked', function () {
			menuIcon.trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
		});

		it('hides when clicked gain', function () {
			menuIcon.trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

	describe('Initial Entries', function () {
		beforeEach(function (done) {
			loadFeed(0, done);
		});

		it('contains at least one entry', function () {
			var entries = $('.entry-link');
			expect(entries.length).toBeGreaterThan(0);
		});
	});

	describe('New Feed Selection', function () {
		 var firstUrl;

		 beforeEach(function (done) {
			loadFeed(0, function () {
				firstUrl = $('.entry-link')[0].href;
				loadFeed(1, done);
			});
		 });

		 it('changes content', function () {
			var newFirstUrl = $('.entry-link')[0].href;
			expect(newFirstUrl).not.toEqual(firstUrl);
		 });
	});

	/* Additional feature: Add a new feed */
	describe('The add menu', function () {
		var addMenuIcon,
			body;

		beforeAll(function () {
			addMenuIcon = $('.add-menu-icon');
			body = $('body');
		});

		it('is hidden by default', function () {
			expect(body.hasClass('add-menu-hidden')).toBe(true);
		});

		it('displays when clicked', function () {
			addMenuIcon.trigger('click');
			expect(body.hasClass('add-menu-hidden')).toBe(false);
		});

		it('hides when clicked gain', function () {
			addMenuIcon.trigger('click');
			expect(body.hasClass('add-menu-hidden')).toBe(true);
		});
	});

	describe('Adding a valid new feed', function () {
		// This test is made with a valid feed url
		var newFeedUrl = 'http://feeds.reuters.com/news/artsculture';

		var initialFeedsLength = allFeeds.length,
			feedList = $('.feed-list'),
			initialFeedListLength = feedList.children().length;

		// Add feed is an asynchronous function
		beforeEach(function (done) {
			addFeed(newFeedUrl, done);
		});

		it('adds an entry to allFeeds', function () {
			expect(allFeeds.length).toBe(initialFeedsLength + 1);
		});

		it('adds a feed to the feed list', function () {
			var feedListLength = feedList.children().length;
			expect(feedListLength).toBe(initialFeedListLength + 1);
		});
	});

	describe('Adding an unvalid new feed', function () {
		// This test is made with a unvalid feed url
		var newFeedUrl = '';

		var initialFeedsLength = allFeeds.length;

		// Add feed is an asynchronous function
		beforeEach(function (done) {
			addFeed(newFeedUrl, done);
		});

		it('adds no new entry to allFeeds', function () {
			expect(allFeeds.length).toBe(initialFeedsLength);
		});
	});

}());
