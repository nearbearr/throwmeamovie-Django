//temp function to list all the file names extracted from the folder
  function createList(recognizedMovies, ratings, unrecognizedMovies) {
	$("#moviesRecog").show();
	$("#moviesUnrecog").show();
	$('input[type="file"]').removeAttr('disabled');
	$('#file_input_label').html('Select your movies directory...');
    var list = $("#fileNamesList");
    var file;
    var rating;
	var link;
	var tomatoeRating;
	var title;
	html_ += '<tr><td>Movie Name</td><td>IMDb Rating <img src="images/imdb.jpg" width="20" height="20" /></td><td>Rotten Tomatoes Rating <img src="images/rt.png" width="20" height="20" /></td><td>Link to IMDb</td></tr>';
    for(var i=0; i<recognizedMovies.length; i++) {
      file = recognizedMovies[i];
      rating = ratings[i];
	  link = recognizedImdbLinks[i];
	  title = recognizedTitles[i];
	  tomatoeRating = recognizedTomatoeRating[i];
	  html_ += '<tr>';
      html_ += '<td>'+title+'</td><td>'+rating+'</td><td>'+tomatoeRating+'%</td><td><a target="_blank" href="http://www.imdb.com/title/'+link+'">IMDb</a></td>';
	  html_ += '</tr>';
    }
	console.log(html_);
	$("#tblMoviesRecog").html(html_);
	html_ = "";
	html_ += '<tr><td>Movie Name</td><td>Search on Google</td></tr>';
    for(var i=0;i<unrecognizedMovies.length;i++) {
      file = unrecognizedMovies[i];
      html_ += '<tr><td>'+file+'</td><td><a href="http://www.google.com/search?q='+file+' imdb" target="_blank">Google</a></td></tr>';
    }
    $("#tblMoviesUnrecog").html(html_);
  }

  function filterOutMovies(fileNames) {
    var file;
    var lastPos;
    var extension;
    for(var i=0;i<fileNames.length;i++) {
      file = fileNames[i];
      lastPos = file.lastIndexOf(".");
      extension = file.substring(lastPos+1,file.length);
      if($.inArray(extension, movieExtensions)!=-1) {
        movieNames.push(file);
      }
    }
  }

  function correctMovieNames(movieNames) {
    var file;
    var words;
    var word;
    for(var i=0;i<movieNames.length;i++) {
      file = movieNames[i];
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
      correctedMovieNames.push(file);
    }
  }

  function sortMovies(movieNames, ratings) {
    for(var i=0; i<ratings.length; i++) {
      if(ratings[i]!="null") {
		    recognizedTitles.push(title[i]);
        recognizedMovies.push(movieNames[i]);
        recognizedMovieRatings.push(ratings[i]);
		    recognizedImdbLinks.push(imdbLinks[i]);
		    recognizedTomatoeRating.push(tomatoeRating[i]);
      } else {
        unrecognizedMovies.push(movieNames[i]);
      }
    }
    var tmpMovieName;
    var tmpMovieRating;
	var tmpImdbLink;
	var tmpTomatoeRating;
	var tmpTitle;
    for(var i=0;i<recognizedMovieRatings.length;i++) {
      for(var j=i+1;j<recognizedMovieRatings.length;j++) {
        if(recognizedMovieRatings[i]<recognizedMovieRatings[j]) {
          //swap
          tmpMovieName = recognizedMovies[i];
          tmpMovieRating = recognizedMovieRatings[i];
		  tmpImdbLink = recognizedImdbLinks[i];
		  tmpTomatoeRating = recognizedTomatoeRating[i];
		  tmpTitle = recognizedTitles[i];
          recognizedMovies[i] = recognizedMovies[j];
          recognizedMovieRatings[i] = recognizedMovieRatings[j];
		  recognizedImdbLinks[i] = recognizedImdbLinks[j];
		  recognizedTomatoeRating[i] = recognizedTomatoeRating[j];
		  recognizedTitles[i] = recognizedTitles[j];
          recognizedMovies[j] = tmpMovieName;
          recognizedMovieRatings[j] = tmpMovieRating;
		  recognizedImdbLinks[j] = tmpImdbLink;
		  recognizedTomatoeRating[j] = tmpTomatoeRating;
		  recognizedTitles[j] = tmpTitle;
        }
      }
    }
    createList(recognizedMovies, recognizedMovieRatings, unrecognizedMovies);
  
  }

  function fetchRatings(correctedMovieNames) {
    var movie;
    for(var i=0;i<correctedMovieNames.length;i++) {
      movie = correctedMovieNames[i];
	  console.log('http://omdbapi.com/?tomatoe=true&t='+movie);
      $.get('http://omdbapi.com/?tomatoes=true&t='+movie, function(data) {
        if(data.Response === "True") {
          ratings.push(data.imdbRating);
		  imdbLinks.push(data.imdbID);
		  title.push(data.Title);
		  tomatoeRating.push(data.tomatoUserMeter);
          if(ratings.length==correctedMovieNames.length) {
            sortMovies(correctedMovieNames,ratings);
          }
        } else {
		  title.push("null");
          ratings.push("null");
		  imdbLinks.push("null");
		  tomatoeRating.push("null");
          if(ratings.length==correctedMovieNames.length) {
            sortMovies(correctedMovieNames,ratings);
          }
        }
      });
    }
  }

  function Tree(selector) { 
    this.$el = $(selector);
    this.fileList = [];
    var self = this;

    this.init = function(e) {
		$('input[type="file"]').attr('disabled','disabled');
		$('#file_input_label').html('Fetching the ratings for you...');
      // Reset
      tree_ = {};
      html_ = '';
      fileNames = [];
      self.fileList = e.target.files;
      movieNames = [];
      correctedMovieNames = [];
      ratings = [];
      recognizedMovies = [];
      unrecognizedMovies = [];
      recognizedMovieRatings = [];
	  imdbLinks = [];
	  recognizedImdbLinks = [];
	  tomatoeRating = [];
	  recognizedTomatoeRating = [];
	  title = [];
	  recognizedTitles = [];
      movieExtensions = ["mp4","mpeg","avi","flv","mkv"];
      wordsToRemove = ["e sub xrg",".avi","1.4","5.1","-","dvdrip","brrip","xvid","1cdrip","axxo",
                      "x264","720p","dvdscr","mp3","hdrip","webrip","etrg","yify","stylishsalh","stylish release",
                      "trippleaudio","enghindiindonesian","385mb","cool guy","a2zrg","x264","hindi","aac",
                      "ac3","mp3"," r6","hdrip","h264","esub","aqos","alliance","unrated","extratorrentrg","brrip",
                      "mkv","mpg","diamond","usabitcom","amiable","brrip","xvid","absurdity","dvdrip","taste",
                      "bluray","hr","cocain","bestdivx","maxspeed","eng","500mb","fxg","ac3","feel","subs","s4a",
                      "bdrip","ftw","xvid","noir","1337x","revott","glowgaze","mp4","unrated","hdrip","archivist",
                      "thewretched","www","torrentfive","com","1080p","1080","secretmyth","kingdom","release",
                      "dvdrip","vip3r","rises","bida","readnfo","hellraz0r","tots","bestdivx","usabit","fasm",
                      "neroz","576p","limited","series","extratorrent","dvdrip","brrip","699mb","700mb","greenbud",
                      "b89","480p","amx","007","dvdrip","h264","phrax","eng","tode","line","xvid","sc0rp","ptpower",
                      "oscars","dxva","mxmg","3lt0n","titan","4playhd","hq","hdrip","moh","mp4","badmeetsevil",
                      "xvid","3li","ptpower","3d","hsbs","cc","rips","webrip","r5","psig","'goku61","gb","goku61",
                      "nl","ee","rel","nl","pseudo","dvd","rip","neroz","extended","dvdscr","xvid","warrlord",
                      "scream","merry","xmas","imb","7o9","exclusive","171","didee","v2","scr","sam","mov","brrip",
                      "charmeleon","silver rg","1xcd","ddr","1cd","x264","extratorrenrg","srkfan","unique","dvd",
                      "crazy torrent","spidy","pristine","hd","ganool","ts","bito","arigold","rip","rets","teh","avi",
                      "chivvez","song4","playxd","limited","600mb","700mb","900mb","hdtv","mmkv","dvdscr",
                      "full","movie","english","youtube","teamtnt","mafiaking","com","flv","missripz", "ictv", "mediafiremoviez", 
                      "worldfree4u", "nova", "tugazx", "web dl shaanig", "jaybob", "m720p", "thirty bokutox", "264", "dc", 
                      "sample", "dir cut", "directors cut", "x262","tnt", "ws", "ur", "torrent", "kickass", "gaz", 
                      "edition", "sujaidr", "yify1", "prisak hkrg", "skylane77", "cd1", "cd2", "gaz", "digiexvid", "torentz ", 
                      "3xforum", "ro", "dubby", "xrg","evo", "rawnitro", "greenbud1969", "xrg", "divx", "ltt", "illidan91", 
                      "engsubs", "hellberg", "rawnitro", "redheart", "dabugarman", "wingtip", "gaz", "dd", "uvall", 
                      "sinners", "muxed", "old","crcworld", "imbt", "bokutox", "muxed", "thepecko", "bokutox", "wbz", 
                      "davemen2000", "sreepc", "hdscene","dual","audio"];

      // TODO: optimize this so we're not going through the file list twice
      // (here and in buildFromPathList).
      for (var i = 0, file; file = self.fileList[i]; ++i) {
        fileNames.push(file.name); 
      }
      filterOutMovies(fileNames);
      correctMovieNames(movieNames);
      fetchRatings(correctedMovieNames);
    }
  };

  var tree = new Tree('#dir-tree');
  var html_;
  var fileNames;
  var movieNames;
  var correctedMovieNames;
  var movieExtensions;
  var wordsToRemove;
  var ratings;
  var recognizedMovies;
  var recognizedMovieRatings;
  var unrecognizedMovies;
  var imdbLinks;
  var recognizedImdbLinks;
  var tomatoeRating;
  var recognizedTomatoeRating;
  var title;
  var recognizedTitles;
  $('#file_input').change(tree.init);