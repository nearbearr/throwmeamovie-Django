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
	<title>Movie Reviews | throwmeamovie.</title>
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
		  width: 300px;
		  height: 450px;
		  margin: 10px 10px 10px 10px;
		}
		.demo-card-square > .mdl-card__title {
		  color: #fff;
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

   <br>

   <section id="content">

   	<div class="container">

   		<h2 class="text-center">Box Office Movies</h2>

   		<div class="row">

   		<?php

  		$query = "select * from box_office_movies";

  		$result = mysqli_query($conn, $query);

  		while($row = mysqli_fetch_array($result)) {
  			

  		?>

   			<div class="col-md-4" style="margin-bottom:30px">

				<div class="demo-card-square mdl-card mdl-shadow--2dp">
				  <div class="mdl-card__title mdl-card--expand" style="background:url(<?php echo 'movie_images/'.$row['poster']; ?>) top left 100% no-repeat #46B6AC;">
				  </div>
				  <div class="mdl-card__supporting-text">
				  	
				    <h3><?php echo $row['title']; ?></h3>
				    <?php echo substr($row['description'],0,100); ?>... <a href="critic_reviews.php?title=<?php echo $row['title']; ?>" >Read More</a>
				    <br><strong><?php echo $row['genre']; ?></strong>
				  </div>
				  <div class="mdl-card__actions mdl-card--border">
				  	<table>

				  		
				  		<tr>
				  			<td>
							    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="http://www.imdb.com/title/<?php echo $row['imdb_id']; ?>" target="_blank">
							      IMDb
							    </a>
							</td>
							<td>
								<?php echo $row['imdb_rating']; ?>
							</td>
						</tr>
						<tr>
							<td>
							    <a href="#" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
							      Rotten Tomatoes
							    </a>
							</td>
							<td>
								<?php echo $row['rt_score']; ?>
							</td>
						</tr>
						<tr>
							<td>
							    <a href="critic_reviews.php?title=<?php echo $row['title']; ?>" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
							      Critic Reviews
							    </a>
							</td>
						</tr>

						
				    </table>
				  </div>
				
			
				</div>
							
			</div>

		<?php
			}
		?>
		
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
              	<li><a href="#top">Movie Reviews.</a></li>
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