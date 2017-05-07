
var fullUpdatedDirectory = [];
Movie = function() {

		this.movieName;
		this.correctedMovieName;
		this.imdbRating;
		this.title;
		this.imdbID;
		this.tomatoeRating;
		this.year;
		this.runtime;
		this.genre;
		this.response;
		this.poster;

		/**
		* set the movie name
		*/
		this.setMovieName = function(name) {

				this.movieName = name;

		}

		/**
		* logic to remove the unwanted words from the
		* movie name as fetched from the user's directory
		*/
		this.correctMovieName = function() {

					var file = this.movieName;
					file = file.toLowerCase();

				//replace all the non alphanumeric characters with space
			    file = file.replace(/[^A-Za-z0-9' ]/ig, ' ');

			    //replace all the words like 999mb with space
			    file = file.replace(/[0-9]+mb/,' ');

			    //replace muptiple spaces with a single one
			    file = file.replace(/ +(?=)/g," ");

			    words = file.split(" ");
			    file = "";

			    for(var j=0;j<words.length;j++) {
					    	word = words[j];
						    if(!isNaN(word)) {
								      if(parseInt(word)>=1900 && parseInt(word)<=2016) {
								        		continue;
								      }
						    }

						    if($.inArray(word, wordsToRemove)==-1) {
								      file += word;
								      file += " ";
						    }
					}

			  	this.correctedMovieName = file;
			}

			/**
			* api call here that fetches the rating from the omdb api
			* set all the required paramters
			*/
			this.fetchMovieRating = function() {

					var movie = this.correctedMovieName;
					var html_ = '';
					var jqxhr = $.get('http://omdbapi.com/?tomatoes=true&t='+movie, function() {})
						.done(function(data) {
							if(data.Response === "True") {

								this.imdbRating = data.imdbRating;
								this.imdbID = data.imdbID;
								this.title = data.Title;
								this.tomatoeRating = data.tomatoUserMeter;
								this.year = data.Year;
								this.runtime = data.Runtime;
								this.genre = data.Genre;
								this.poster = data.Poster;
								this.response = true;

								//sub title code
								var subsfile = this.title;
								subsfile = subsfile.replace(/ /g,'-');

								//generate html to be displayed
								html_ += '<tr>';
							    html_ += '<td><strong>' + this.title + '</strong><br><span class="text-muted">' + this.genre +'</span></td><td>' +
							    		 this.imdbRating + '</td><td>' + this.tomatoeRating + '%</td><td>' + 'Runtime:' + this.runtime + '<br>' +
							    		 '<a target="_blank" href="http://subsmax.com/subtitles-movie/' + subsfile + '-English">Download Subs</a>' +
							    		 '<br><a target="_blank" href="http://www.imdb.com/title/' + this.imdbID + '">View on IMDb</a></td>';
								html_ += '</tr>';

								$("#tblMoviesRecog").append(html_);



								fullUpdatedDirectory.push(this);
								count ++;
									// if(count == totalCount){
									// 	fullUpdatedDirectory.push(this);
									// 	fullUpdatedDirectory = fullUpdatedDirectory.slice(0,-1);
									// 	console.log('yes1');
									// 	console.log(fullUpdatedDirectory);
										// console.log(unrecognized);
										// recUnrecognizedSort(unrecognized);
										// checkLoginStatusSort(fullUpdatedDirectory);
									// }

							} else {

								this.response = false;
								recUnrecognizedSort(movie);
								// scrape unrecognized movie names

								// html_ += '<tr>';
								// html_ += '<td>'+movie+'</td>';
								// html_ += '<td><a href="http://www.google.com/search?q='+movie+' imdb" target="_blank">Google</a></td>';
								// html_ += '</tr>';
								//
								// unrecognized.push(movie);


								// count++;
								//
								// if(count == totalCount){
								// 	fullUpdatedDirectory.push(this);
								// 	fullUpdatedDirectory = fullUpdatedDirectory.slice(0,-1);
								// 	console.log('yes2');
								// 	console.log(fullUpdatedDirectory);
								// 	checkLoginStatusSort(fullUpdatedDirectory);
								// }


								// $("#tblMoviesUnrecog").append(html_);

							}
						})

						.fail(function() {
							console.log(movie + ' fetching information failed');
							count++;

							if(count == totalCount){
								fullUpdatedDirectory.push(this);
								fullUpdatedDirectory = fullUpdatedDirectory.slice(0,-1);
								console.log('yes3');
								console.log(fullUpdatedDirectory);
								checkLoginStatusSort(fullUpdatedDirectory);
							}

						});
				}
}

function APIcallonscraped(movie){

		var html_ = '';
		var jqxhr = $.get('http://omdbapi.com/?tomatoes=true&t='+movie, function() {})
			.done(function(data) {
				if(data.Response === "True") {
							console.log(data);
							var imdbRating = data.imdbRating;
							var imdbID = data.imdbID;
							var title = data.Title;
							var tomatoeRating = data.tomatoUserMeter;
							var year = data.Year;
							var runtime = data.Runtime;
							var genre = data.Genre;
							var poster = data.Poster;
							var response = true;

							var dataObj = {'imdbRating': imdbRating , 'imdbID': imdbID , 'title': title , 'tomatoeRating': tomatoeRating , 'year': year , 'runtime': runtime , 'genre': genre , 'poster': poster}

							var subsfile = title;
							subsfile = subsfile.replace(/ /g,'-');

							html_ += '<tr>';
								html_ += '<td><strong>' + title + '</strong><br><span class="text-muted">' + genre +'</span></td><td>' +
										 imdbRating + '</td><td>' + tomatoeRating + '%</td><td>' + 'Runtime:' + runtime + '<br>' +
										 '<a target="_blank" href="http://subsmax.com/subtitles-movie/' + subsfile + '-English">Download Subs</a>' +
										 '<br><a target="_blank" href="http://www.imdb.com/title/' + imdbID + '">View on IMDb</a></td>';
							html_ += '</tr>';

						$("#tblMoviesRecog").append(html_);
						fullUpdatedDirectory.push(dataObj);
						console.log(fullUpdatedDirectory);
						count++;
						console.log(count);
						console.log('total' +totalCount);
						if(count == totalCount){
								console.log('All movie data retrieved');
								checkLoginStatusSort(fullUpdatedDirectory);
						}
					}
					else {
							 count++;
							 if(count == totalCount){
									 console.log('All movie data retrieved');
									 checkLoginStatusSort(fullUpdatedDirectory);
							 }
				}
	});
}
