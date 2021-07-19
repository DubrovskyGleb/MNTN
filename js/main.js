"use strict"

const burger = document.querySelector('.burger');

burger.addEventListener('click', function () {
    document.body.classList.toggle('_lock');
    burger.previousElementSibling.classList.toggle('_active');
    burger.classList.toggle('_active');
});

window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.parallax__content');
        const mountains = document.querySelector('.parallax__mountains');
        const human = document.querySelector('.parallax__human');

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
        };
        const observer = new IntersectionObserver(callback, {
            threshold: thresholdSets
        });

        observer.observe(document.querySelector('.content__wrapper'));

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%,${scrollTopProcent}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
            human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 2}%);`;
        }

    }
}

let positionStart = window.pageYOffset;
const header = document.querySelector('.header');
const wrapper = document.querySelector('.content__wrapper');
let wrapperOffset = wrapper.offsetTop;

window.addEventListener('scroll', () => {

    let positionCurrent = window.pageYOffset;
    let clientHeight = document.documentElement.clientHeight;

    positionCurrent > positionStart ? header.classList.remove('_active') : header.classList.add('_active');
    positionCurrent > clientHeight ? header.style.backgroundColor = "#061015" : header.style.backgroundColor = "inherit";
    positionStart = positionCurrent;

});