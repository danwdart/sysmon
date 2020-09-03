const sass = require('node-sass');

module.exports = function(grunt) {
    // Project configuration.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      run: {
          serve: {
              cmd: "node",
              args: [
                  "server.js"
              ]
          },
          jest: {
              cmd: "jest",
              args: [
                  "test"
              ]
          }
      },
      eslint: {
            browser: {
                options: {
                    configFile: ".eslint.browser.js"
                },
                target: ["public/js/app.js"]
            },
            node: {
                options: {
                    configFile: ".eslint.node.js"
                },
                target: ["./*.js", "routes", "lib/**/*.js"]
            }
      },
      clean: {
            dist: [
                "public/js/**/*.min.js",
                "public/css/"
            ]
      },
      sass: {
          options: {
              implementation: sass
          },
          dist: {
              files: {
                  "public/css/style.css": "sass/index.sass"
              }
          }
      },
      copy: {
          frontend: {
              files: [
                  {
                    expand: true,
                    flatten: true,
                    src: [
                        "./node_modules/details-polyfill/index.js",
                        "./node_modules/jquery/dist/jquery.min.js",
                        "./node_modules/popper.js/dist/umd/popper.min.js",
                        "./node_modules/bootstrap/dist/js/bootstrap.min.js"
                    ],
                    dest: "./public/js/"
                },
                  {
                    expand: true,
                    flatten: true,
                      src: [
                        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
                        "./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
                      ],
                      dest: "./public/css/"
                },
                {
                    expand: true,
                    flatten: true,
                    src: [
                      "./node_modules/@fortawesome/fontawesome-free/webfonts/*",
                    ],
                    dest: "./public/webfonts/"
              },
              ]              
          }
      }
    });

    require('grunt-register-tasks')(grunt, {
        test: ["eslint", "run:jest"],
        serve: ["run:serve"],
        build: ["clean", "sass", "copy"],
        start: ["build", "test", "serve"],
        default: ["start"]
    });
  
  };