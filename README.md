# grunt-australian-stylesheets
[![Build Status](https://travis-ci.org/stevemao/grunt-australian-stylesheets.png?branch=master)](https://travis-ci.org/stevemao/grunt-australian-stylesheets)
[![Dependency Status](https://david-dm.org/stevemao/grunt-australian-stylesheets.png)](https://david-dm.org/stevemao/grunt-australian-stylesheets)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Compile Australian CSS with [postcss-australian-stylesheets](https://github.com/dp-lewis/postcss-australian-stylesheets)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-australian-stylesheets --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-australian-stylesheets');
```

## The "australian-stylesheets" task

### Overview
In your project's Gruntfile, add a section named `australian-stylesheets` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  australian-stylesheets: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.diff
Type: `Boolean|String`
Default value: `false`

Set it to `true` if you want to get an output patch file:

```js
options: {
  diff: true // or 'custom/path/to/file.css.patch'
}
```
Also you can specify a path where to save this file. More examples in [Gruntfile](https://github.com/stevemao/grunt-australian-stylesheets/blob/master/Gruntfile.js).

#### options.map
Type: `Boolean|Object`
Default value: `false`

If the `map` option isn't defined or is set to `false`, australian-stylesheets will neither create nor update a sourcemap.

If `true` is specified, australian-stylesheets will try to find a sourcemap from a previous compilation step using an annotation comment (e.g. from Sass) and create a new sourcemap based on the found one (or just create a new inlined sourcemap). The created sourcemap can be either a separate file or an inlined map depending on what the previous sourcemap was.

You can gain more control over sourcemap generation by setting an object to the `map` option:

* `prev` (string or `false`): a path to a directory where a previous sourcemap is (e.g. `path/`). By default, australian-stylesheets will try to find a previous sourcemap using a path from the annotation comment (or using the annotation comment itself if the map is inlined). You can also set this option to `false` to delete the previous sourcemap.
* `inline` (boolean): whether a sourcemap will be inlined or not. By default, it will be the same as a previous sourcemap or inlined.
* `annotation` (string): set this option to URL path you wish the annotation comment to be e.g. `path/file.css.map` (by default, australian-stylesheets will save your sourcemap to a directory where you save CSS). This option requires `inline` to be `false` or undefined.
* `sourcesContent` (boolean): whether original contents (e.g. Sass sources) will be included to a sourcemap. By default, australian-stylesheets will add contents only for new sourcemaps or if a previous sourcemap has them.

### Usage Examples

```js
grunt.initConfig({

  australianStylesheets: {

    options: {
      // Task-specific options go here.
    },

    // compile the specified file
    single_file: {
      options: {
        // Target-specific options go here.
      },
      src: 'src/css/file.css',
      dest: 'dest/css/file.css'
    },

    // compile all files
    multiple_files: [{
      expand: true,
      flatten: true,
      src: 'src/css/*.css', // -> src/css/file1.css, src/css/file2.css
      dest: 'dest/css/' // -> dest/css/file1.css, dest/css/file2.css
    }],

    // if you have specified only the `src` param, the destination will be set automatically,
    // so source files will be overwritten
    no_dest: {
      src: 'dest/css/file.css' // globbing is also possible here
    },

    diff: {
        options: {
            diff: true
        },
        src: 'src/css/file.css',
        dest: 'dest/css/file.css' // -> dest/css/file.css, dest/css/file.css.patch
    },

    sourcemap: {
        options: {
            map: true
        },
        src: 'src/css/file.css',
        dest: 'dest/css/file.css' // -> dest/css/file.css, sourcemap is inlined
    },

    sourcemap_separate: {
        options: {
            map: {
                inline: false
            }
        },
        src: 'src/css/file.css',
        dest: 'dest/css/file.css' // -> dest/css/file.css, dest/css/file.css.map
    },
  }

});
```

Check out project's [Gruntfile.js](https://github.com/stevemao/grunt-australian-stylesheets/blob/master/Gruntfile.js) for more examples.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
