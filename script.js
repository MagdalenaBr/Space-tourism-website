"use strict";

const navMenu = document.querySelector(".nav");
const btn = document.querySelector(".header__btn");
const planets = Array.from(
	document.querySelectorAll(".destination__planet-name")
);
const destinationTitle = document.querySelector(".destination__title");
const destinationText = document.querySelector(".destination__text");
const destinationPlanetImg = document.querySelector(".destination__planet-img");
const destinationDistanceNum = document.querySelector(".distance-number");
const destinationTravelNum = document.querySelector(".travel-number");

/////NAV///////
btn.addEventListener("click", function () {
	navMenu.classList.toggle("active");
	navMenu.classList.contains("active")
		? (btn.style.backgroundImage = "url(assets/shared/icon-close.svg)")
		: (btn.style.backgroundImage = "url(assets/shared/icon-hamburger.svg)");
});

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

////////CREW//////

const crewImg = document.querySelector(".crew__img");
const crewProfession = document.querySelector(".crew__profession");
const crewMemberName = document.querySelector(".crew__name");
const crewMemberDescription = document.querySelector(".crew__description");
const slidersBtn = Array.from(document.querySelectorAll(".slider__btn"));

const renderCrewData = function (data, i) {
	crewImg.src = data[i].images.png;
	crewProfession.textContent = data[i].role;
	crewMemberName.textContent = data[i].name;
	crewMemberDescription.textContent = data[i].bio;
};
// CHANGING CREW DATA IN DOM
slidersBtn.forEach((slider, i) => {
	slider.addEventListener("click", function (e) {
		e.preventDefault();
		slidersBtn.forEach(slider =>
			slider.classList.remove("slider__btn--active")
		);
		slider.classList.add("slider__btn--active");
		const dataJson = getData().then(data => {
			const { crew } = data;
			renderCrewData(crew, i);
		});
	});
});

const crewContainer = document.querySelector(".crew__img-container");

let number = 0;
let startPos;
let currPos;
let lastPos;

crewContainer.addEventListener(
	"touchstart",
	function (e) {
		e.preventDefault();
		return (startPos = e.touches[0].pageX);
	},
	{
		passive: false,
	}
);

crewContainer.addEventListener(
	"touchmove",
	function (e) {
		e.preventDefault();
		lastPos = e.touches[0].pageX;
		return (currPos = lastPos - startPos);
	},
	{
		passive: false,
	}
);

crewContainer.addEventListener(
	"touchend",
	function (e) {
		console.log(e);
		e.preventDefault();

		const dataJson = getData().then(data => {
			const { crew } = data;
			console.log(currPos);
			if (currPos < -30 && number < "3") {
				number++;
				renderCrewData(crew, number);
			}

			if (currPos > 30 && number > "0") {
				number--;
				renderCrewData(crew, number);
			}
		});
	},
	{
		passive: false,
	}
);
