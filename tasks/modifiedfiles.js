'use strict';

/*global require,module*/
var grunt = require('grunt');

module.exports = function (grunt) {
    var _ = require('lodash');

    grunt.registerTask('git_modified_files', 'Get a list of modified local files from Git and set them as a property', function() {
        var done = this.async();
        var options = this.options({
            regexp: /.*/,
            diffFilter: 'ACM'
        });
        var diffFilterRegex = new RegExp(/(A|C|D|M|R|T|U|X|B)+/);

        if (!diffFilterRegex.test(options.diffFilter)) {
            grunt.fail.warn('The format of diffFilter options is wrong');
        }

        grunt.util.spawn({
            cmd: 'git',
            args: ['diff', 'HEAD', '--name-only', '--diff-filter=' + options.diffFilter] // staged and working tree files
        }, function(error, result){

            var modifiedFiles = _.compact(String(result).split(grunt.util.linefeed));

            var filterRegex = new RegExp(options.regexp);
            var modifiedFilesFiltered = _.filter(modifiedFiles, function (f) {
                return filterRegex.test(f);
            });

            grunt.verbose.writeln('Modified files:' + modifiedFiles);
            grunt.verbose.writeln('Modified files filtered:' + modifiedFilesFiltered);

            grunt.config.set('gmf.all', modifiedFiles);
            grunt.config.set('gmf.filtered', modifiedFilesFiltered);

            done();
        });
    });

};
