let animStyle = document.createElement("style");
let currentStyles = [], currentKeyframes = [], scrollElems = [];

//Add decoder to load
function init(){
	window.addEventListener('DOMContentLoaded',	function() {
		let elems = document.querySelectorAll(".animatable");
		for (let elem of elems){
			decodeStyles(elem);
		}
		document.head.appendChild(animStyle);
		
		scrollElems = document.querySelectorAll(".animatable");
		addScrollListeners();
		scrollInit();
	});
}

//Scroll-activated animations
	function addScrollListeners() {
		window.addEventListener('scroll', checkScrollPos);
		window.addEventListener('resize', scrollInit);
		checkScrollPos();
	}
						
	function scrollInit() {	
		addScrollListeners();
		checkScrollPos();
	}
	
	function checkScrollPos(){
		for (let elem of scrollElems) {
			let positionFromTop = elem.getBoundingClientRect().top;
			if (positionFromTop - window.innerHeight <= 0) {
				elem.className = elem.className.replace("animatable", "animation");
			}
		}
	}

//Decode arguments
function decodeStyles(elem){
	let attributes = elem.dataset.animation.split(" ");
	
	//Create a new style element for the custom animation
	for (let attribute of attributes){
		let data = attribute.split("---");
		let dataSplit = data[0].split("-");
		let animActivator = dataSplit[0];
		let animType = dataSplit[1];
		let animAttributesRaw = data[1].split("--");
		let animAttributes = {};
		
		for (let i = 0; i < animAttributesRaw.length; i++){
			let splitAttr = animAttributesRaw[i].split("-");
			animAttributes[splitAttr[0]] = splitAttr[1];
		}
		
		let keyframes = createKeyframes(animType, animAttributes);
		
		if (!currentKeyframes.includes(keyframes["name"])){
			//Add fade in keyframes
			animStyle.innerHTML += keyframes["data"] + "\n";
			currentKeyframes.push(keyframes["name"]);
		}
		
		if (animAttributes["time"] === undefined){
			animAttributes["time"] = "0p5s";
		}
		animAttributes["time"] = animAttributes["time"].replace("p", ".");
		if (animAttributes["delay"] !== undefined){
			animAttributes["delay"] = animAttributes["delay"].replace("p", ".");
		}

		//Create new class in stylesheet
		
		let style = ".animation." + attribute;
		if (!currentStyles.includes(style)){
			animStyle.innerHTML += style + " {animation-name:" + keyframes["name"] + "; animation-duration:" + animAttributes["time"] + "; animation-delay:" + animAttributes["delay"] + ";}\n";
			currentStyles.push(style);
		}
		
		elem.classList.add(attribute);
	}
}

function createKeyframes(type, args){
	switch(type.toLowerCase()){
		default:
		case "fadein":
			return createFadeIn(args);
			break;
		case "slidein":
			return createSlideIn(args);
			break;
	}
}

function createFadeIn(args){
	let from = args["from"] !== undefined ? args["from"] : "0";
	let to = args["to"] !== undefined ? args["to"] : "1";
	let name = "fadeIn-" + from + "-" + to;
	
	from = from.replace("p", ".");
	to = to.replace("p", ".");
	
	return {"name": name,
			"data": "@keyframes " + name + "{from{opacity: " + from + ";} to{opacity: " + to + ";}}"};
}

function createSlideIn(args){
	let fromX = "-100";
	let toX = "0";
	let fromY = "0";
	let toY = "0";
	
	switch(args["dir"].toLowerCase()){
		default:
			break;
		case "top":
			fromX = "0";
			fromY = "-100";
			break;
		case "topright":
			fromX = "100";
			fromY = "-100";
			break;
		case "right":
			fromX = "100";
			break;
		case "bottomright":
			fromX = "100";
			fromY = "100";
			break;
		case "bottom":
			fromX = "0";
			fromY = "100";
			break;
		case "bottomleft":
			fromX = "-100";
			fromY = "100";
			break;
		case "topleft":
			fromX = "-100"
			fromY = "-100";
			break;
	}
	
	let name = "slideIn-dir-" + args["dir"];
	
	return {"name": name,
			"data": "@keyframes " + name + "{from{transform: translate(" + fromX + "vw, " + fromY + "vh);} to{transform: translate(" + toX + "vw, " + toY + "vh);}}"};
}

export {init, decodeStyles};