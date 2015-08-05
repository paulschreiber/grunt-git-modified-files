# grunt-git-modified-files
> Grunt plugin to generate the list of the files which have been modified in your Git working tree.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-git-modified-files --save-dev
```

Once done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-git-modified-files');
```

The plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## How it works

It will retrieve the modified files using git by running:

```bash
git diff HEAD --name-only --diff-filter=ACM
```

## Task

Assuming installation via NPM, you can use grunt-git-modified-files in your gruntfile like this:

```javascript
'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        git_modified_files : {
            options: {
                diffFiltered: 'AMC', // optional: default is 'AMC',
                regexp: /\.js$/ // optional: default is /.*/
            }
        }
    });

    grunt.loadNpmTasks('grunt-git-modified-files');

    grunt.registerTask('default', ['grunt-git-modified-files']);

};
```

You can retrieve the list of modified files like this:

    grunt.config.get('gmf.all')

Or using the grunt shortcut `<%= gmf.all %>`

You can retrieve the list of modified files filtered by the regexp like this:

    grunt.config.get('gmf.filtered')

Or using the grunt shortcut `<%= gmf.filtered %>`

### Options

#### options.regexp
Type: `RegExp`

Indicates the regexp to apply to the list of modified files.

#### options.diffFiltered
Type: `String`

Indicates the parameters to set to the argument `--diff-filter` of git diff.

## Inspired by
https://github.com/Causata/grunt-git-changedfiles

https://github.com/Ideame/grunt-git-ref-changed-files
