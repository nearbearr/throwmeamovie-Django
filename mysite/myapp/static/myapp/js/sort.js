	sortMovieRating = function(param){

		if(param == 0){

			fullUpdatedDirectory.sort(function(x, y) {
		    return y.imdbRating - x.imdbRating;
			});
			console.log(fullUpdatedDirectory);


		}

		else{
			fullUpdatedDirectory.sort(function(a, b) {
		    return b.tomatoeRating - a.tomatoeRating;
			});
			console.log(fullUpdatedDirectory);
		}


		$("#tblMoviesRecog").empty();
		var html_ = '<tr>'+
              '<td><strong>Movie</strong></td>'+
			  '<td><strong>IMDb Rating</strong> <img src="{% static "myapp/images/imdb.jpg" %}" width="30" height="30" />'+
			  '<img src="{% static "myapp/images/sort.png" %}" onclick="sortMovieRating(0);" width="30" height="30"/>'+
			  '</td>'+
              '<td><strong>Rotten Tomatoes</strong> <img src="{% static "myapp/images/rt.png" %}" width="40" height="40" />'+
			  '<img src="{% static "myapp/images/sort.pn" %}" onclick="sortMovieRating(1);" width="30" height="30"/>'+'</td>'+
              '<td><strong>Extras</strong></td>'+
            '</tr>';
		for(var i=0; i<fullUpdatedDirectory.length; i++){

			// var subsfile = fullUpdatedDirectory[i].title;
			// subsfile = subsfile.replace(/ /g,'-');

			//generate html to be displayed
			html_ += '<tr>';
		    html_ += '<td><strong>' + fullUpdatedDirectory[i].title + '</strong><br><span class="text-muted">' + fullUpdatedDirectory[i].genre +'</span></td><td>' +
		    		 fullUpdatedDirectory[i].imdbRating + '</td><td>' + fullUpdatedDirectory[i].tomatoeRating + '%</td><td>' + 'Runtime:' + fullUpdatedDirectory[i].runtime + '<br>' +
		    		 '<a target="_blank" href="http://subsmax.com/subtitles-movie/' + fullUpdatedDirectory[i].title.split(' ').join('-') + '-English">Download Subs</a>' +
		    		 '<br><a target="_blank" href="http://www.imdb.com/title/' + fullUpdatedDirectory[i].imdbID + '">View on IMDb</a></td>';
			html_ += '</tr>';
		}
		$("#tblMoviesRecog").append(html_);
	}
