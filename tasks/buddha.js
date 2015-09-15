/*
 * grunt-buddha
 *
 *
 * Copyright (c) 2015 charlie
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');  //nodejs 的path模块用于路径的操作

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha', 'This is a plugin named grunt-buddha', function () {

    // Merge task-specific and/or target-specific options with these defaults.

    //this.options 获取在Gruntfile.js中配置task时声明的options
    var options = this.options({
          who:'alpaca',         //默认配置项
          commentsSymbol:'//'   //默认配置项
        }),
        commentsFile = {
          buddha:'assets/buddha.txt',
          alpaca:'assets/alpaca.txt'
        },
        who = options.who,

        //字符验证正则
        symbolReg = {
           'alpaca': /┗┓┓┏━┳┓┏┛ + + + +/,
           'buddha': /o8888888o/
        };
    // Iterate over all specified file groups.
    /**
     * this.files -->  src 和 dest键值对的数组
     * forEach 是es5中新增的数组遍历函数
     *    function(arrEle, index, array)
     */

    this.files.forEach(function (file) {
      //__dirname为nodejs下的全局变量，表示当前文件所在目录
      var commentsFilepath = path.join( __dirname, commentsFile[who] ),
        commentsContent = grunt.file.read( commentsFilepath ),
      lineContentArr = commentsContent.split( '\n' );
      lineContentArr.forEach(function( value, i, arr ){
        arr[i] = options.commentsSymbol + value;
      });
      commentsContent = lineContentArr.join('\n');

      // Concat specified files.
      file.src.filter(function (filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {//检验文件是否存在
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }) .map(function( filepath ){
          var originalFileContent = grunt.file.read(filepath),
              newFileContent = commentsContent + "\n" + originalFileContent;
        //如果文件中已加入字符画则return
        if(symbolReg[who].test(originalFileContent)){
          return;
        }
        grunt.file.write(filepath, newFileContent);
      });
      // Write the destination file.写入目标文件
      //grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });

    //this.files.forEach(function (file) {
    //  // Concat specified files.
    //  var src = file.src.filter(function (filepath) {
    //    // Warn on and remove invalid source files (if nonull was set).
    //    if (!grunt.file.exists(filepath)) {//检验文件是否存在
    //      grunt.log.warn('Source file "' + filepath + '" not found.');
    //      return false;
    //    } else {
    //      return true;
    //    }
    //  }).map(function (filepath) {
    //    // Read file source. 读取源文件内容
    //    return grunt.file.read(filepath);
    //  }).join(grunt.util.normalizelf(options.separator));//按照指定字符将源文件内容拼接，normalizelf用于将当前换行符转换为适合当前操作系统的换行符
    //
    //  // Handle options.
    //  src += options.punctuation;
    //
    //  // Write the destination file.写入目标文件
    //  grunt.file.write(file.dest, src);
    //
    //  // Print a success message.
    //  grunt.log.writeln('File "' + file.dest + '" created.');
    //});
  });

};
