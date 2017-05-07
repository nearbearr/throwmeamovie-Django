function Tree(selector) { 
    
    this.$el = $(selector);
    
    this.fileList = [];
    
    var self = this;

    this.init = function(e) {

		$('input[type="file"]').attr('disabled','disabled');

		$('#file_input_label').html('Fetching the ratings for you...');
        
        // Reset

        self.fileList = e.target.files;
        
        tree_ = {};

        var singleFile;

        // TODO: optimize this so we're not going through the file list twice
        // (here and in buildFromPathList).
	    for (var i = 0, file; file = self.fileList[i]; ++i) {

	    	if(checkFileFormat(file.name)) {
	    		
	    		singleFile = new Movie();

	    		singleFile.setMovieName(file.name);
		    	
		    	fullDirectory.push(singleFile);

	    	}
	    
		}

		//fullDirectory now contains all the directory information

		var current_movie;

		$("#moviesRecog").show();

		$("#moviesUnrecog").show();

		totalCount = fullDirectory.length;

		for(var i=0; i<fullDirectory.length; i++) {
			
			current_movie = fullDirectory[i];

			current_movie.correctMovieName();

			current_movie.fetchMovieRating();

		}

		$('input[type="file"]').removeAttr('disabled');

		$('#file_input_label').html('Select your movies directory...');
  
	};

}

function checkFileFormat(file) {
	
	var lastPos;

    var extension;
    
    lastPos = file.lastIndexOf(".");
    
    extension = file.substring(lastPos+1,file.length);
    
    if($.inArray(extension, movieExtensions)!=-1) {
        return true;
    }
    
    return false;

}

function allMoviesFetchedActions() {
	var data = JSON.stringify(unrecognized);
	data = data.replace(/[\']/ig, ' ');
	console.log(data);
	$.ajax({
		datatype:"json",
		method:"GET",
		url : 'addUnrecognized.php?data='+data
	});
}

var totalCount = 0, count = 0;

var tree = new Tree('#dir-tree');

var fullDirectory = [];

$('#file_input').change(tree.init);

var unrecognized = [];