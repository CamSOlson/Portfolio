function init(){
	window.addEventListener("DOMContentLoaded", function(e){
		let body = document.querySelector("body");

		let header = document.createElement("header");
		header.id = "header";
		header.classList.add("animatable");
		header.dataset.animation = "fade(scroll, 0.5s, 0s);";

		let title = document.createElement("a");
		title.href = "../";
		title.innerHTML = "<h1>Cameron Olson</h1>";
		header.append(title);

		let nav = document.createElement("nav");
		header.append(nav);

		let navToggle = document.createElement("a");
		navToggle.id = "nav_toggle";
		navToggle.innerHTML = "▼";
		nav.append(navToggle);

		let homeButton = document.createElement("a");
		homeButton.href = "../";
		homeButton.innerHTML = "Home";
		nav.append(homeButton);

		let bioButton = document.createElement("a");
		bioButton.href = "../bio/";
		bioButton.innerHTML = "About";
		nav.append(bioButton);

		let projectButton = document.createElement("a");
		projectButton.href = "../projects/";
		projectButton.innerHTML = "Projects";
		nav.append(projectButton);

		let resumeButton = document.createElement("a");
		resumeButton.href = "../resume/";
		resumeButton.innerHTML = "Resume";
		nav.append(resumeButton);

		let contactButton = document.createElement("a");
		contactButton.href = "../contact/";
		contactButton.innerHTML = "Contact";
		nav.append(contactButton);

		body.append(header, body.firstChild);
		// <header id="header" class="animatable" data-animation="scroll-fadeIn---time-0p5s">
		// 	<a href="../"><h1>Cameron Olson</h1></a>
		// 	<nav>
		// 		<a id="nav_toggle">▼</a>
		// 		<a href="../">Home</a>
		// 		<a href="../bio/">About</a>
		// 		<a href="../projects/">Projects</a>
		// 		<a href="../resume/">Resume</a>
		// 		<a href="../contact/">Contact</a>
		// 	</nav>
		// </header>
	});
}

export {init};