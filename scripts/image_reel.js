var imgReel;
var display;
var imgs;
var imgSelector;
var imgSelectorButtons = [];
var activeImage = 0;

//Get all images and store them, and generate the bubbles on the selection bar
window.addEventListener('DOMContentLoaded',	function() {
	imgReel = document.querySelector("div#image_reel");
	display = document.querySelector("div#display");
	imgs = document.querySelectorAll("figure.reel_image");
	imgSelector = document.querySelector("div#image_selector");
	
	//Add left and right buttons
	let leftBtn = document.querySelector("a#left_img_button");
	leftBtn.classList.add("img_nav_button");
	leftBtn.classList.add("left");
	leftBtn.onclick = function(){
		activeImage--;
		updateImages();
	};

	let rightBtn = document.querySelector("a#right_img_button");
	rightBtn.classList.add("img_nav_button");
	rightBtn.classList.add("right");
	rightBtn.onclick = function() {
		activeImage++;
		updateImages();
	}
	
	//Set up individual images and selector
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
});

function updateImages(){
	if (activeImage < 0){
		activeImage = imgs.length - 1;
	}else if (activeImage >= imgs.length){
		activeImage = 0;
	}
	
	for (let i = 0; i < imgs.length; i++){
		if (imgs[i].classList.contains("active") || imgSelectorButtons[i].classList.contains("active")){
			imgs[i].classList.remove("active");
			imgs[i].classList.add("hidden");
			imgSelectorButtons[i].classList.remove("active");
		}else if (i === activeImage){
			imgSelectorButtons[i].classList.add("active");
			imgs[i].classList.add("active");
			imgs[i].classList.remove("hidden");
		}
	}
}