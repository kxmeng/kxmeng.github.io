var shapestext = "<h2></h2><ul><li></li></ul>";

$("#shapes").click(function() {
	$('.active').removeClass("active");
	$(this).addClass("active");
	$("#content").html(shapestext);
});