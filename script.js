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

btn.addEventListener("click", function () {
	navMenu.classList.toggle("active");
	navMenu.classList.contains("active")
		? (btn.style.backgroundImage =
				"url(assets/shared/icon-close.svg)")
		: (btn.style.backgroundImage =
				"url(assets/shared/icon-hamburger.svg)");
});

/// Get JSON DATA
const getData = async function () {
	const res = await fetch("./data.json");
	const data = await res.json();
	console.log(data);
	return data;
};

/// RENDER DATA

const renderPlanetData = function (planet) {
	destinationTitle.textContent = planet.name;
	destinationText.textContent = planet.description;
	destinationPlanetImg.src = planet.images.png;
	destinationDistanceNum.textContent = planet.distance;
	destinationTravelNum.textContent = planet.travel;
};

//// CHANGING PLANET DATA IN DOM
planetsArr.forEach((planet, i) => {
	planet.addEventListener("click", function (e) {
		e.preventDefault();
		planetsArr.forEach(planet => {
			planet.classList.remove("border");
		});
		e.target.classList.add("border");

		const dataJson = getData().then(data => {
			const { destinations } = data;
			const moon = destinations[0];
			const mars = destinations[1];
			const europa = destinations[2];
			const titan = destinations[3];

			i === 0
				? renderPlanetData(moon)
				: i === 1
				? renderPlanetData(mars)
				: i === 2
				? renderPlanetData(europa)
				: renderPlanetData(titan);
		});
	});
});
