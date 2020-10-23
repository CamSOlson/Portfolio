let imgReel, display, imgs, imgSelector;
let imgSelectorButtons = [];
let activeImage = 0;
let swipeObjects, swipeObj;

//Get all images and store them, and generate the bubbles on the selection bar
function init(){
	if (document.querySelector("div#image_reel") != undefined){
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
		
			//Set up swipe support
			swipeObj = document.querySelector("section#highlights");
			if (swipeObj !== undefined){
				swipeDetect(swipeObj, function(swipedir){
					switch (swipedir){
						case "left":
							rightBtn.click();
							break;
						case "right":
							leftBtn.click();
							break;
					}
				});
			}
		
		});
	}
}

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

function swipeDetect(e, callback){
	let touchsurface = e, swipedir, startX, startY, distX, distY, elapsedTime, startTime,
	threshold = 50, //min dist
	restraint = 50, //max deviation
	allowedTime = 300; //max time
	let swipeHandle = callback || function(swipedir){};
  
	touchsurface.addEventListener("touchstart", function(e){
		let touchobj = e.changedTouches[0];
		swipedir = "none";
		distX = 0;
		distY = 0;
		startX = touchobj.pageX;
		startY = touchobj.pageY;
		startTime = new Date().getTime();
	});
  
	touchsurface.addEventListener("touchmove", function(e){
		let touchobj = e.changedTouches[0];
		distX = touchobj.pageX - startX;
		distY = touchobj.pageY - startY;
	
		if (Math.abs(distX) > Math.abs(distY) && e.cancelable){
			e.preventDefault();
		}
	});
  
	touchsurface.addEventListener("touchend", function(e){
		let touchobj = e.changedTouches[0];
		distX = touchobj.pageX - startX;
		distY = touchobj.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				swipedir = (distX < 0) ? "left" : "right";
			}
		}
		swipeHandle(swipedir);
		// if (Math.abs(distX) <= 5 && Math.abs(distY) <= 5){
		// 	e.target.click();
		// }
	}, false);
}

export {init, updateImages, swipeDetect};