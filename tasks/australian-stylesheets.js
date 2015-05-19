'use strict';

var path = require('path');
var ozcss = require('postcss-australian-stylesheets');
var postcss = require('postcss');
var diff = require('diff');
var chalk = require('chalk');

module.exports = function(grunt) {

    var options;
    var processor;

    /**
     * Returns an input map contents if a custom map path was specified
     * @param {string} from Input CSS path
     * @returns {?string}
     */
    function getPrevMap(from) {
        if (typeof options.map.prev === 'string') {
            var mapPath = options.map.prev + path.basename(from) + '.map';

            if (grunt.file.exists(mapPath)) {
                return grunt.file.read(mapPath);
            }
        }
    }

    /**
     * @param {string} input Input CSS contents
     * @param {string} from Input CSS path
     * @param {string} to Output CSS path
     * @returns {{css: string, map: ?string}}
     */
    function processing(input, from, to) {
        return processor.process(input, {
            map: (typeof options.map === 'boolean') ? options.map : {
                prev: getPrevMap(from),
                inline: (typeof options.map.inline === 'boolean') ? options.map.inline : true,
                annotation: (typeof options.map.annotation === 'string') ? options.map.annotation : true,
                sourcesContent: (typeof options.map.sourcesContent === 'boolean') ? options.map.sourcesContent : true
            },
            from: from,
            to: to
        });
    }

    /**
     * @param {string} msg Log message
     */
    function log(msg) {
        grunt.verbose.writeln(msg);
    }

    function task(self) {
        options = self.options({
            diff: false,
            map: false
        });

        var tally = {
            sheets: 0,
            maps: 0,
            diffs: 0
        };

        processor = postcss()
            .use(ozcss());

        self.files.forEach(function(f) {
            if (!f.src.length) {
                return grunt.fail.warn('No source files were found.');
            }

            try {
                f.src.forEach(function(filepath) {
                    var dest = f.dest || filepath;
                    var input = grunt.file.read(filepath);
                    var output = processing(input, filepath, dest);

                    grunt.file.write(dest, output.css);
                    log('File ' + chalk.cyan(dest) + ' created.');
                    tally.sheets++;

                    if (output.map) {
                        grunt.file.write(dest + '.map', output.map.toString());
                        log('File ' + chalk.cyan(dest + '.map') + ' created (source map).');
                        tally.maps++;
                    }

                    if (options.diff) {
                        var diffPath = (typeof options.diff === 'string') ? options.diff : dest + '.diff';

                        grunt.file.write(diffPath, diff.createPatch(dest, input, output.css));
                        log('File ' + chalk.cyan(diffPath) + ' created (diff).');
                        tally.diffs++;
                    }
                });
            } catch (e) {
                grunt.fail.fatal(e);
            }
        });

        if (tally.sheets) {
            grunt.log.ok(tally.sheets + ' ' + 'compiled ' + grunt.util.pluralize(tally.sheets, 'stylesheet/stylesheets') + ' created.');
        }

        if (tally.maps) {
            grunt.log.ok(tally.maps + ' ' + grunt.util.pluralize(tally.maps, 'sourcemap/sourcemaps') + ' created.');
        }

        if (tally.diffs) {
            grunt.log.ok(tally.diffs + ' ' + grunt.util.pluralize(tally.diffs, 'diff/diffs') + ' created.');
        }
    }

    grunt.registerMultiTask('australianStylesheets', 'Compile Australian CSS.', function() {
        task(this);
    });

    grunt.registerMultiTask('ozcss', 'Compile Australian CSS.', function() {
        task(this);
    });

};
