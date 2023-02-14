"use strict";

const navMenu = document.querySelector(".nav");
const btn = document.querySelector(".header__btn");
const planets = [...document.querySelectorAll(".destination__planet-name")];
const destinationTitle = document.querySelector(".destination__title");
const destinationText = document.querySelector(".destination__text");
const destinationPlanetImg = document.querySelector(".destination__planet-img");
const destinationDistanceNum = document.querySelector(".distance-number");
const destinationTravelNum = document.querySelector(".travel-number");
const crewImg = document.querySelector(".crew__img");
const crewProfession = document.querySelector(".crew__profession");
const crewMemberName = document.querySelector(".crew__name");
const crewMemberDescription = document.querySelector(".crew__description");
const slidersBtn = [...document.querySelectorAll(".slider__btn")];
const container = document.querySelector(".subpage");
const technologyImgLandscape = document.querySelector(".technology__img--landscape");
const technologyImgPortrait = document.querySelector(".technology__img--portrait");
const technologyName = document.querySelector(".technology__name");
const technologyDescription = document.querySelector(
	".technology__description"
);
let number = 0;
let startPos;
let touchLenght;
let lastPos;

/// Get JSON DATA
const getData = async function () {
	const res = await fetch("./data.json");
	const data = await res.json();
	return data;
};



/// RENDER DATA

const renderPlanetData = function (planet, i) {
	destinationTitle.textContent = planet[i].name;
	destinationText.textContent = planet[i].description;
	destinationPlanetImg.src = planet[i].images.png;
	destinationDistanceNum.textContent = planet[i].distance;
	destinationTravelNum.textContent = planet[i].travel;
};
const renderCrewData = function (data, i) {
	crewImg.src = data[i].images.png;
	crewProfession.textContent = data[i].role;
	crewMemberName.textContent = data[i].name;
	crewMemberDescription.textContent = data[i].bio;
};
const renderTechnologyData = function (data, i) {
	const width = window.innerWidth;
	width < 1100
		? (technologyImgLandscape.srcset = data[i].images.landscape)
		: (technologyImgPortrait.srcset = data[i].images.portrait);
	technologyName.textContent = data[i].name;
	technologyDescription.textContent = data[i].description;
};
const renderActiveData = function (crew, technology, number) {
	document.URL.includes("crew.html")
		? renderCrewData(crew, number)
		: renderTechnologyData(technology, number);
};
const activeDot = function () {
	slidersBtn.forEach(slider => slider.classList.remove("slider__btn--active"));
	slidersBtn[number].classList.add("slider__btn--active");
};

/////NAV///////
btn.addEventListener("click", function () {
	navMenu.classList.toggle("active");
	navMenu.classList.contains("active")
		? (btn.style.backgroundImage = "url(assets/shared/icon-close.svg)")
		: (btn.style.backgroundImage = "url(assets/shared/icon-hamburger.svg)");
});

//// CHANGING PLANET DATA IN DOM
planets.forEach((planet, i) => {
	planet.addEventListener("click", function (e) {
		e.preventDefault();
		planets.forEach(planet => planet.classList.remove("border"));
		planet.classList.add("border");
		const dataJson = getData().then(data => {
			const { destinations } = data;
			renderPlanetData(destinations, i);
		});
	});
});

// CHANGING CREW AND TECHNOLOGY DATA
slidersBtn.forEach((slider, i) => {
	slider.addEventListener("click", function (e) {
		// e.preventDefault();
		slidersBtn.forEach(slider =>
			slider.classList.remove("slider__btn--active")
		);
		slider.classList.add("slider__btn--active");
		const dataJson = getData().then(data => {
			number = i;
			const { crew } = data;
			const { technology } = data;

			renderActiveData(crew, technology, number);
		});
	});
});

//// CREW TOUCH EVENTS
container.addEventListener(
	"touchstart",
	function (e) {
		// e.preventDefault();
		return (startPos = e.touches[0].pageX);
	},
	{
		passive: false,
	}
);

container.addEventListener(
	"touchmove",
	function (e) {
		// e.preventDefault();
		lastPos = e.touches[0].pageX;
		return (touchLenght = lastPos - startPos);
	},
	{
		passive: false,
	}
);

container.addEventListener(
	"touchend",
	function (e) {
		// e.preventDefault();
		const dataJson = getData().then(data => {
			const { crew } = data;
			const { technology } = data;
			if (touchLenght < -30 && number < slidersBtn.length - 1) {
				number++;
				renderActiveData(crew, technology, number);
				activeDot();
			}

			if (touchLenght > 30 && number > "0") {
				number--;
				renderActiveData(crew, technology, number);
				activeDot();
			}
		});
	},
	{
		passive: false,
	}
);
