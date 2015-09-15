/*
 * grunt-buddha
 *
 *
 * Copyright (c) 2015 charlie
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks 加载package.json中声明的grunt module
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [//测试指定的文件
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    //
    buddha:{
      options:{
        who:'alpaca', //哪个字符画
        commentsSymbol:'//'  //使用‘//’注释符注释字符画
      },
      dist:['test/fixtures/*.js']  //插件需求是在文件头部添加指定字符画，所以最终是要覆盖源文件，所以配置项只需要源文件
    },

    // Configuration to be run (and then tested).
    //buddha: {
    //  default_options: {
    //    options: {
    //    },
    //    files: {
    //      'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
    //    }
    //  },
    //  custom_options: {
    //    options: {
    //      separator: ': ',
    //      punctuation: ' !!!'
    //    },
    //    files: {
    //      'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
    //    }
    //  }
    //},

    // Unit tests.指定测试脚本指向*_test.js
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).  从指定目录加载task相关的文件
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'buddha', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
