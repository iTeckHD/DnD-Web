module.exports = function(grunt) {

  	grunt.initConfig({
  		//UTILITY
	  	clean: ['_compiled/*'],
	  	copy: {
			css: {
				files: [
					{
						expand: true, 
						cwd: '_compiled', 
						src: '*.min.css', 
						dest: 'release/static/css'
					},
				],
			},
			js: {
				files: [
					{
						expand: true, 
						cwd: '_compiled', 
						src: '*.min.js', 
						dest: 'release/static/js'
					},
				],
			}
		},

	  	//LESS - CSS
	    less: {
	    	development: {
	    		files: {
	    			'_compiled/site.css': '_raw/less/*.less'
	    		}
	    	}
	    },
	    cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '_compiled',
					src: ['*.css', '!*.min.css'],
					dest: '_compiled',
					ext: '.min.css'
				}]
			}
		},

		//JAVASCRIPT
		uglify: {
			target: {
				files: {
				'_compiled/app.min.js': ['_raw/js/*.js']
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', '_raw/js/*.js']
		},

		//JSON
		jsonlint: {
			json: {
				src: [ '_raw/json/*.json' ]
			}
		},

		//WATCH COMMAND
	    watch: {
	    	jshint: {
	    		files: '_raw/js/*',
	    		tasks: ['jshint', 'uglify', 'copy:js']
	    	},
	    	jsonlint : {
	    		files: ['_raw/json/*', '_raw/json/**/*'],
	    		tasks: ['jsonlint']
	    	},
	    	less : {
	    		files: '_raw/less/*',
	    		tasks: ['clean', 'less', 'cssmin', 'copy:css']
	    	}
	    }
  	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-contrib-copy');
};