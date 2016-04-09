$(document).ready(function() {
	footer = $("#footer")[0];
	if ((footer.offsetTop + footer.clientHeight) < window.outerHeight) {
		$(footer).css("position", "fixed");
	}
})