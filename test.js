const test = require('node:test');
const assert = require('node:assert/strict');
const { splitChapters, reviewScript } = require('./lib');
test('splits chapter headers', () => assert.equal(splitChapters('Chapter 1: Start\nHello\nChapter 2: End\nBye').length, 2));
test('guards sixty minute limit', () => assert.match(reviewScript('hello', 61).notes.join(' '), /1 and 60/));
test('estimates reading length', () => assert.equal(reviewScript('one two three', 1).estimated, 1));
