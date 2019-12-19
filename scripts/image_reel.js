var imgs = document.querySelectorAll("figure.reel_image");
var imgSelector = document.querySelector("div#image_selector");
var imgSelectorButtons = [];
var activeImage = 0;

//Get all images and store them, and generate the bubbles on the selection bar
window.onload = function() {
	imgSelector
	imgs
	
	for (let i = 0; i < imgs.length; i++){
		let selector = document.createElement("a");
		selector.classList.add("image_selector_button");
		selector.dataset.index = i;
		if (!imgs[i].classList.contains("hidden")){
			selector.classList.add("active");
			activeImage = i;
		}
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
			activeImage = event.target.dataset.index;
			event.target.classList.add("active");
		};
		imgSelector.appendChild(selector);
		imgSelectorButtons.push(selector);
	}
}