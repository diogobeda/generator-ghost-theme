'use strict';

module.exports = function (grunt) {
	// load the grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			compass: {
				files: ['assets/css/{,*/}*.{scss, sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			handlebars: {
				files: ['*.hbs', 'partials/{,*/}*.hbs'],
				tasks: ['handlebars:server', 'staticHandlebars:server']
			},
			livereload: {
				options: {
					livereload: '<%%= connect.options.livereload %>'
				},
				files: [
					'*.hbs',
					'partials/{,*/}*.hbs',
					'.tmp/styles/{,*/}*.css',
					'{.tmp, assets/js}/{,*/}*.js',
					'assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
					// put fonts changes here
				]
			}
		},
		connect: {
			options: {
				port: 3000,
				livereload: 35729,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp'
					]
				}
			}
		},
		clean: {
			server: '.tmp'
		},
		compass: {
			options: {
				sassDir: 'assets/css/sass',
				cssDir: '.tmp/styles',
				imagesDir: 'assets/images',
        javascriptsDir: 'assets/scripts',
        fontsDir: 'assets/styles/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		// handlebars: {
		// 	server: {
		// 		options: {
		// 			node: true	
		// 		},
		// 		files: {
		// 			'.tmp/test.js': ['*.hbs', 'partials/{,*/}*.hbs']
		// 		}
		// 	}
		// },
		// staticHandlebars: {
		// 	server: {
		// 		options: {
		// 			assets: {
		// 				filesRoot: 'assets'
		// 			}
		// 		},
		// 		files: {
		// 			'.tmp/*.html': '*.hbs'
		// 		}
		// 	}
		// },
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			}
		},
		copy: {
			styles: {
        expand: true,
        dot: true,
        cwd: 'assets/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
		},
		concurrent: {
			server: [
				'compass',
				'copy:styles'
			]
		}
	});

	grunt.registerTask('server', function (target) {
		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});
}