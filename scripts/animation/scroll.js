
	var elems;
	var windowHeight;
	
	function init() {
		elems = document.querySelectorAll('.animatable');
		windowHeight = window.innerHeight;
		window.addEventListener("scroll", checkPos);
		window.addEventListener("resize", init);
		checkPos();
	}
	
	function checkPos() {
		for (let elem of elems) {
			let positionFromTop = elem.getBoundingClientRect().top;
			if (positionFromTop - windowHeight <= 0) {
				elem.className = elem.className.replace("animatable", "animation");
			}
		}
	}
	

//Start scripts on load
window.addEventListener("DOMContentLoaded",	init());
