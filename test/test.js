'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.australianStylesheets = {

    setUp: function(done) {
        // setup here if necessary
        done();
    },

    single_file: function(test) {
        var actual = grunt.file.read('tmp/single_file.css');
        var expected = grunt.file.read('test/expected/colour.css');

        test.strictEqual(actual, expected, 'should compile single file.');
        test.done();
    },

    multiple_files: function(test) {
        var actual = grunt.file.read('tmp/multiple_files/colour.css');
        var expected = grunt.file.read('test/expected/colour.css');

        test.strictEqual(actual, expected, 'should compile all files.');
        test.done();
    },

    single_no_dest: function(test) {
        var actual = grunt.file.read('tmp/no_dest.css');
        var expected = grunt.file.read('test/expected/colour.css');

        test.strictEqual(actual, expected, 'should compile a source file if target have no destination specified.');
        test.done();
    },

    no_dest_multiple: function(test) {
        var actual = grunt.file.read('tmp/no_dest_multiple/colour.css');
        var expected = grunt.file.read('test/expected/colour.css');

        test.strictEqual(actual, expected, 'should compile all source files if target have no destination specified.');
        test.done();
    },

    diff: function(test) {
        var actual = grunt.file.read('tmp/diff.css.diff');
        var expected = grunt.file.read('test/expected/diff.css.diff');

        test.strictEqual(actual, expected, 'should create a diff for a compiled file.');
        test.done();
    },

    diff_path: function(test) {
        var actual = grunt.file.read('tmp/diff_path.css.diff');
        var expected = grunt.file.read('test/expected/diff_path.css.diff');

        test.strictEqual(actual, expected, 'should create a diff for a compiled file and save it to a given path.');
        test.done();
    },

    sm: function(test) {
        var actual = {
            css: grunt.file.read('tmp/sm.css'),
            map: JSON.parse(grunt.file.read('tmp/sm.css.map'))
        };

        var expected = {
            css: grunt.file.read('test/expected/sm.css'),
            map: JSON.parse(grunt.file.read('test/expected/sm.css.map'))
        };

        test.strictEqual(actual.css, expected.css, 'should add an annotation comment.');
        test.deepEqual(actual.map, expected.map, 'should generate a new source map.');
        test.done();
    },

    sm_update: function(test) {
        var actual = {
            css: grunt.file.read('tmp/sm_update.css'),
            map: grunt.file.read('tmp/sm_update.css.map')
        };

        var expected = {
            css: grunt.file.read('test/expected/sm_update.css'),
            map: grunt.file.read('test/expected/sm_update.css.map')
        };

        test.strictEqual(actual.css, expected.css, 'should leave an annotation comment unchanged.');
        test.deepEqual(actual.map, expected.map, 'should update an existing source map.');
        test.done();
    },

    sm_update_by_path: function(test) {
        var actual = {
            css: grunt.file.read('tmp/sm_update_by_path.css'),
            map: grunt.file.read('tmp/sm_update_by_path.css.map')
        };

        var expected = {
            css: grunt.file.read('test/expected/sm_update_by_path.css'),
            map: grunt.file.read('test/expected/sm_update_by_path.css.map')
        };

        test.strictEqual(actual.css, expected.css, 'should leave an annotation comment unchanged.');
        test.deepEqual(actual.map, expected.map, 'should update an existing source map by path.');
        test.done();
    },

    sm_void: function(test) {
        var actual = grunt.file.read('tmp/sm_void.css');
        var expected = grunt.file.read('test/expected/sm_void.css');

        test.strictEqual(actual, expected, 'shouldn\'t generate a map if the map option is set to `false`.');
        test.ok(grunt.file.exists('tmp/sm_void.css.map') === false);
        test.done();
    },

    sm_inline: function(test) {
        var actual = grunt.file.read('tmp/sm_inline.css');
        var expected = grunt.file.read('test/expected/sm_inline.css');

        test.strictEqual(actual, expected, 'should inline a new source map.');
        test.done();
    },

    sm_inline_update: function(test) {
        var actual = grunt.file.read('tmp/sm_inline_update.css');
        var expected = grunt.file.read('test/expected/sm_inline_update.css');

        test.strictEqual(actual, expected, 'should update an inlined source map.');
        test.done();
    },

    sm_annotation_path: function(test) {
        var actual = grunt.file.read('tmp/sm_annotation_path.css');
        var expected = grunt.file.read('test/expected/sm_annotation_path.css');

        test.strictEqual(actual, expected, 'should update sourcemap annotation.');
        test.done();
    }
};
