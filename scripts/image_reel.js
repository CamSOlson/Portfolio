var imgs = document.querySelectorAll("figure.reel_image");
var imgSelector = document.querySelector("div#image_selector");
var imgSelectorButtons = [];

//Get all images and store them, and generate the bubbles on the selection bar
window.onload = function() {
	imgSelector
	imgs
	
	for (let i = 0; i < imgs.length; i++){
		let selector = document.createElement("a");
		selector.classList.add("image_selector_button");
		selector.onclick = function(){
			imgs[i].classList.remove("hidden");
			for (let hideI = 0; hideI < imgs.length; hideI++){
				if (hideI !== i){
					imgs[hideI].classList.add("hidden");
				}
			}
			for (let btn of imgSelectorButtons){
				btn.classList.remove("active");
			}
			event.target.classList.add("active");
		};
		imgSelector.appendChild(selector);
		imgSelectorButtons.push(selector);
	}
}