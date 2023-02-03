"use strict";

const navMenu = document.querySelector(".nav");
const btn = document.querySelector(".header__btn");
const planets = document.querySelectorAll(".destination__planet-name");
const planetsArr = Array.from(planets);
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
planetsArr.forEach((planet, i) => {
	planet.addEventListener("click", function (e) {
		e.preventDefault();
		planetsArr.forEach(planet => planet.classList.remove("border"));
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
const sliderBtn = document.querySelectorAll(".slider__btn");
const slidersBtnArr = Array.from(sliderBtn);

const renderCrewData = function (data, i) {
	crewImg.src = data[i].images.png;
	crewProfession.textContent = data[i].role;
	crewMemberName.textContent = data[i].name;
	crewMemberDescription.textContent = data[i].bio;
};
//// CHANGING CREW DATA IN DOM
slidersBtnArr.forEach((slider, i) => {
	slider.addEventListener("click", function (e) {
		e.preventDefault();
		slidersBtnArr.forEach(slider =>
			slider.classList.remove("slider__btn--active")
		);
		slider.classList.add("slider__btn--active");
		const dataJson = getData().then(data => {
			const { crew } = data;
			renderCrewData(crew, i);
		});
	});
});
