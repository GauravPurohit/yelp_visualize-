<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>RestViz</title>
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen" />
<script type="text/javascript" src="http://jqueryjs.googlecode.com/files/jquery-1.3.2.js"></script>
<script src="https://maps.google.com/maps/api/js?sensor=false"/>
<script type="text/javascript">
$(document).ready(function(){
	
});
</script>

</head>

<body >


		<div id="main_container">
					<div id="map_container">
						<div id="mapPresentationCanvas"></div>
					</div>	<!-- end of map container -->
				</div>	<!-- end of main container -->
		
	


<div id="mypanel" class="panel" style="color: white;">
	<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RestViz</h3>
	<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rest assured that your evening is in good hands!</p>
	<p>Customized Restaurant Selection based on the yelp dataset.</p>
	
	
<div style="clear:both;"></div>

	<div class="columns">
		
	
		<div class="colright">
			<h3>What is important for you?</h3>
				<br><button id="submitFilter" type="button">Apply Filter</button>
		</div>
	</div>
<div style="clear:both;"></div>

</div>
<a id="mytrigger" class="trigger" href="#">Filter results</a>
<script src="<c:url value="js/script.js" />"></script>
</body>
</html>