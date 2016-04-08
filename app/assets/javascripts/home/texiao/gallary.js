//= require jquery
//= require texiao/gallary/three.min
//= require texiao/gallary/assets
//= require texiao/gallary/preloadjs.min
//= require texiao/gallary/TweenMax.min
//= require texiao/gallary/Stats
//= require texiao/gallary/image-gallery-three
$(document).ready(function() {
	manifest = new Array();
	for(var i in table_img){
		manifest.push({
			src:table_img[i],
			id:table_img[i].split('/')[5]
		});
	}
	var box = $(".box").ig3js({
		manifest: manifest,
		imagePath: '',
		alphaBackground: true,
		onNavigateComplete: function(obj) {
			//     console.log("navigation complete");
			//     console.log(obj);
		}
	});

	$(".next").click(function() {
		box.navigate.next();
		return false;
	});

	$(".prev").click(function() {
		box.navigate.prev();
		return false;
	});

	$(".defP").click(function() {
		box.perspective.default();
		return false;
	});

	$(".trP").click(function() {
		box.perspective.topRight();
		return false;
	});

	$(".tlP").click(function() {
		box.perspective.topLeft();
		return false;
	});

	for (count = 1; count <= 7; count++) {
		$(".goto").append('<a href="#" class="goto' + count + '" pos="' + (count - 1) + '"> ' + count + ' </a>');
		$(".goto" + count).click(function() {
			box.navigate.goTo($(this).attr("pos"));
			return false;
		});
	}

});