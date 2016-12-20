module.exports = function(grunt) {

  	grunt.initConfig({
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
	    	json_spells : {
	    		files: ['_raw/json/spells/**/*'],
	    		tasks: ['json_merge_spells']
	    	},
	    	json_classes : {
	    		files: ['_raw/json/classes/*'],
	    		tasks: ['json_merge_classes']
	    	},
	    	json_races : {
	    		files: ['_raw/json/races/*'],
	    		tasks: ['json_merge_races']
	    	},
	    	less : {
	    		files: '_raw/less/*',
	    		tasks: ['clean', 'less', 'cssmin', 'copy:css']
	    	},
	    },

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
			all: {
				src: [ '_raw/json/*.json' ]
			},
			spells: {
				src: [ '_raw/json/spells/**/*' ]
			}
		}, 
		json_merge_spells:{
			build: {
				src: '_raw/json/spells/**/*',
				target: '_raw/json/spells.json',
			}
		},
		json_merge_classes:{
			build: {
				src: '_raw/json/classes/*',
				target: '_raw/json/classes.json',
			}
		},
		json_merge_races:{
			build: {
				src: '_raw/json/races/*',
				target: '_raw/json/races.json',
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

	grunt.registerMultiTask('json_merge_spells', mergeJson);
	grunt.registerMultiTask('json_merge_classes', mergeJson);
	grunt.registerMultiTask('json_merge_races', mergeJson);

	function mergeJson(){
		this.files.forEach(function(file) {
			var a = file.src.map(function(path, fileIndex){ return '\r\n"' + (fileIndex + 1) + '": ' + grunt.file.read(path).trim(); });

			if (grunt.file.exists(file.target))
				grunt.file.delete(file.target);
			grunt.file.write(file.target, "{" + a.join(', ') + "\r\n}");
		});
	}
};