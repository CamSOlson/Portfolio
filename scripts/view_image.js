let imageView, fullImg;

function init(){
	window.addEventListener('DOMContentLoaded',	function() {
		//Initialize the div for viewing the image
		imageView = document.createElement("div");
		imageView.id = "image_view";
		imageView.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
		imageView.style.width = "100vw";
		imageView.style.height = "100vh";
		imageView.style.position = "fixed";
		imageView.style.zIndex = "100";
		imageView.style.visibility = "hidden";
		imageView.style.opacity = "0";
		imageView.style.transition = "0.25s opacity, 0.25s visibility";
		imageView.style.display = "flex";
		imageView.style.alignItems = "center";
		imageView.style.justifyContent = "center";
		imageView.onclick = hideView;
		
		fullImg = document.createElement("img");
		fullImg.id = "image_view_image";
		fullImg.style.objectFit = "contain";
		fullImg.style.width = "95%";
		fullImg.style.height = "95%";
		fullImg.onclick = hideView;
		
		imageView.appendChild(fullImg);
		
		document.body.appendChild(imageView);
		
		//Set up each clickable image with an on click function
		for (let img of document.querySelectorAll("img.clickable")) {
			img.addEventListener("click", function(){
				showImage(img.src);
			});
		}
	});
}

function showImage(path){
	fullImg.src = path;
	imageView.style.visibility = "visible";
	imageView.style.opacity = "1";
}

function hideView(){
	imageView.style.visibility = "hidden";
	imageView.style.opacity = "0";
}

export {init, showImage, hideView};