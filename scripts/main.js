import * as header from "./header.js";
import * as imageReel from "./image_reel.js";
import * as mobileNav from "./mobile_nav.js";
import * as imageView from "./view_image.js";
import * as animation from "./animation/animation.js";

function init(){
	header.init();
	imageReel.init();
	mobileNav.init();
	imageView.init();
	animation.init();
}

init();
