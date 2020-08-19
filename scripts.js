// Sidebar: when clicked, change class
$("#sidebar-left li").click(function() {
	$('.sidebar-active').removeClass('sidebar-active');
	$(this).addClass('sidebar-active');
	$('.active-topic').removeClass('active-topic');
	$('div#' + $(this).attr('id')).addClass('active-topic');
});

// Add appropriate icon before links
$(".pdf").prepend('<i class="fa fa-file-pdf-o"></i> ');
$(".word").prepend('<i class="fa fa-file-word-o"></i> ');
$(".video").prepend('<i class="fa fa-file-video-o"></i> ');
$(".ppt").prepend('<i class="fa fa-file-powerpoint-o"></i> ');
$(".web").prepend('<i class="fa fa-file-text-o"></i> ');