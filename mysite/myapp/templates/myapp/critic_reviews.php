<?php
include("config.php");
?>

<!DOCTYPE html>
<!--[if lt IE 8 ]><html class="no-js ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="no-js ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 8)|!(IE)]><!-->
<html class="no-js" lang="en"> <!--<![endif]-->
<head>

   <!--- Basic Page Needs
   ================================================== -->
   <meta charset="utf-8">
	<title><?php echo $_GET['title']; ?> Critic Reviews | throwmeamovie.</title>
	<meta name="description" content="">
	<meta name="author" content="">

   <!-- Mobile Specific Metas
   ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<link rel="stylesheet" href="css/material.min.css">
	
	<script src="js/material.min.js"></script>

	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">


	<!-- CSS
    ================================================== -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
   <link rel="stylesheet" href="css/default.css">
	<link rel="stylesheet" href="css/layout.css">
   <link rel="stylesheet" href="css/media-queries.css">

   <!-- Script
   ================================================== -->
	<script src="js/modernizr.js"></script>

   <!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="images/logo_small.png" >
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <style>
		.demo-card-square.mdl-card {
		  width: auto;
		  height: auto;
		  margin: 10px 10px 10px 10px;
		}
		.demo-card-square > .mdl-card__title {
		  color: #fff;
		}
		.mdl-card__supporting-text {
			font-size:1.0em;
		}
	</style>
	   
</head>

<body role="application">

<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="js/jquery.tree.js" type="text/javascript"></script>


<script>

  window.URL = window.URL ? window.URL :
               window.webkitURL ? window.webkitURL : window;

</script>

<body>

   <!-- Header
   ================================================== -->
   <header>

      <div class="row">

         <div class="twelve columns">

            <div class="logo">
               <a href="index.html"><img alt="" src="images/logo_1.png"></a>
            </div>

            <nav id="nav-wrap">

               <a class="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	            <a class="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>

               <ul id="nav" class="nav">

	               <li><a href="index.html">Home</a></li>
	               
				   <li><a href="browse.html">Browse</a></li>
				   
				   <li class="current"><a href="Movie_Reviews.php">Movie Reviews</a></li>

	               <li><a href="about.html">About</a></li>

               </ul> <!-- end #nav -->

            </nav> <!-- end #nav-wrap -->

         </div>

      </div>

   </header> <!-- Header End -->

   <br><br>

   <section id="content">

   <?php 

   $title = $_GET['title'];

   $query = "select * from box_office_movies where title='".$title."'";

   $result = mysqli_query($conn, $query);

   if($result && mysqli_num_rows($result) == 1) {
      
      $row = mysqli_fetch_array($result);

   } else {
      
      //header('Location:index.html');

   }

   ?>

            



   	<div class="container">

      <h2 class="text-center"><?php echo $_GET['title']; ?></h2>

   <div class="row text-center">

      <button class="mdl-button mdl-js-button mdl-button--raised">
        <img src="images/imdb.jpg" height="20" width="20">&nbsp;&nbsp;&nbsp;<strong><?php echo $row['imdb_rating']; ?></strong>
      </button>

      <button class="mdl-button mdl-js-button mdl-button--raised">
        <img src="images/rt.png" height="20" width="20">&nbsp;&nbsp;&nbsp;<strong><?php echo $row['rt_score']; ?></strong>
      </button>

      <button class="mdl-button mdl-js-button mdl-button--raised">
        <strong><a href="Movie_Reviews.php" style="color:black">Box Office Movies</a></strong>
      </button>

      

   </div>
   

   		<div class="row">

   

   <div class = "col-md-5">

      <?php

      $imdb_id = $row['imdb_id'];

      $apikey = 'e76bjmcpkxdj4cmz9g2tn4rg';

      $endpoint = 'http://www.omdbapi.com/?tomatoes=true&i='.$imdb_id;

      $session = curl_init($endpoint);

      curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

      $data = curl_exec($session);

      $movie_info = json_decode($data);

      $poster = 'movie_images/'.$row['poster'];

      ?>

      <div class="row">
         <div class="col-md-6 text-center">
            <img src="<?php echo $poster; ?>" />
         </div>
         <div class="col-md-6">
            <h6>Movie Plot</h6>
            <p><?php echo $movie_info->Plot; ?>
         </div>
      </div>
      <hr>
      <div class="row">
         <div class="col-md-12">
            <?php if(isset($movie_info->Genre)) { ?>
               <strong>Movie Genre: </strong>
               <?php echo $movie_info->Genre; ?><br>
            <?php } ?>
            <?php if(isset($movie_info->Runtime)) { ?>
               <strong>Movie Runtime: </strong>
               <?php echo $movie_info->Runtime; ?><br>
            <?php } ?>
            <?php if(isset($movie_info->Actors)) { ?>
               <strong>Movie Cast: </strong>
               <?php echo $movie_info->Actors; ?><br>
            <?php } ?>
            <?php if(isset($movie_info->Director)) { ?>
               <strong>Movie Director: </strong>
               <?php echo $movie_info->Director; ?>
            <?php } ?>

            <br><br>

         </div>
      </div>

   </div>

   <div class="col-md-6 col-md-offset-1">

   		<?php

   		$movie_id = $row['rt_id'];

		$apikey = 'e76bjmcpkxdj4cmz9g2tn4rg';

		$limit = '6';

		$endpoint = 'http://api.rottentomatoes.com/api/public/v1.0/movies/'.$movie_id.'/reviews.json?apikey='.$apikey.'&page_limit='.$limit;

		$session = curl_init($endpoint);

		curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

		$data = curl_exec($session);

		curl_close($session);

	   	$search_results = json_decode($data);

	   	$reviews = $search_results->reviews;

	   	if(sizeof($reviews) == 0) {
	   		
	   		echo '<h4 class="text-center">Sorry :( <br>No Movie Reviews Found.</h4>';

	   	} else {
        
            echo '<h4 class="text-center">Critic Reviews</h4>';
                
         }

	   	foreach($reviews as $review) {

   		?>

   		<div class="row">


   			<div class="col-md-12" style="margin-bottom:30px">

				<div class="demo-card-square mdl-card mdl-shadow--2dp">
				  
				  <div class="mdl-card__supporting-text">
				  	
				    <h4><?php echo $review->critic; ?></h4>
				    <?php echo $review->quote; ?><br><?php if(isset($review->original_score)) { ?><strong>Original Score: <?php echo $review->original_score; ?></strong> <?php } ?>

				    <?php
				    $links = $review->links;
				    ?>
				    
				  </div>
				  <div class="mdl-card__actions mdl-card--border">
				  	<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="<?php echo $links->review; ?>" target="_blank">Full Review</a>
				  </div>
				
			
				</div>
							
			</div>

		
		</div>

		<?php 

		}

		?>

		
		</div>

      </div>
	
	</div>

   </section>

   

   <!-- footer
   ================================================== -->
   <footer>

      <div class="row">

         <div class="twelve columns">

            <ul class="footer-nav">
					<li><a href="index.html">Home.</a></li>
              	<li><a href="browse.html">Browse.</a></li>
               <li><a href="Movie_Reviews.php">Movie Reviews.</a></li>
              	<li><a href="about.html">About.</a></li>
              	
			   </ul>

            <ul class="footer-social">
               <li><a href="https://web.facebook.com/pages/throwmeamoviecom/1668606913379909?sk=timeline" target="_blank"><i class="fa fa-facebook"></i></a></li>
               
               <li><a href="https://www.google.com/+Throwmeamoviedotcom" target="_blank"><i class="fa fa-google-plus"></i></a></li>
               
            </ul>

            <ul class="copyright">
               <li>Copyright &copy; 2015 throwmeamovie.</li>  
			   <li>Version: Beta 3.0 </li>
				<li>Design by <a href="http://www.styleshout.com/" target="_blank">Styleshout</a></li> 
            </ul>

         </div>

         <div id="go-top" style="display: block;"><a title="Back to Top" href="#">Go To Top</a></div>

      </div>

   </footer> <!-- Footer End-->

   <!-- Java Script
   ================================================== -->
   <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
   <script>window.jQuery || document.write('<script src="js/jquery-1.10.2.min.js"><\/script>')</script>
   <script type="text/javascript" src="js/jquery-migrate-1.2.1.min.js"></script>

   <script src="js/jquery.flexslider.js"></script>
   <script src="js/doubletaptogo.js"></script>
   <script src="js/init.js"></script>
   <script src="js/reviews.js"></script>
   <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-67503903-1', 'auto');
    ga('send', 'pageview');

    </script>
   <!-- <script src="js/randomThrow.js"></script> -->
   

</body>

</html>