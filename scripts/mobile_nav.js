let nav, navToggle;

function init(){
	//Make sure to only add on mobile devices 
	window.addEventListener('DOMContentLoaded',	function() {
		nav = document.querySelector("nav");
		navToggle = document.querySelector("a#nav_toggle");
		navToggle.onclick = function(){
			if (document.documentElement.clientWidth < 750){
				if (nav.classList.contains("open")){
					nav.classList.remove("open");
				}else{
					nav.classList.add("open");
				}
			}
		}
	});
}

export {init};