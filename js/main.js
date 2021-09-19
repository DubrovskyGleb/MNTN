"use strict"

const burger = document.querySelector('.burger');
const marker = document.querySelector('.scroll__marker');
const observedBlocks = document.querySelectorAll('.observedBlock');
const markerTop = { hero: 0, started: 25, essential: 50, key: 75 };

document.addEventListener('click', (e) => {
    scrollToElement(e);
});

function scrollToElement(e) {
    if (e.target.closest('.scrollTo')) {
        e.preventDefault();

        const currentLink = e.target.closest('.scrollTo');
        const sectionId = currentLink.getAttribute('href');
        const currentSection = document.querySelector(sectionId);

        currentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}

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

    const scrollObserver = new IntersectionObserver(function (entries, scrollObserver) {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute('id');
            const currentLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (entry.isIntersecting) {
                currentLink.classList.add('_active');
                marker.style.top = `${markerTop[sectionId]}%`;
                if (!entry.target.classList.contains('hero')) {
                    entry.target.classList.add('_active');
                }
            } else {
                currentLink.classList.remove('_active');
            }
        })
    }, { threshold: 0.3 });

    observedBlocks.forEach(observedBlock => {
        scrollObserver.observe(observedBlock);
    })
}

//Смена цвета меню и его появление при скролле вверх
let positionStart = window.pageYOffset;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let positionCurrent = window.pageYOffset;
    let clientHeight = document.documentElement.clientHeight;

    positionCurrent > positionStart ? header.classList.remove('_active') : header.classList.add('_active');
    positionCurrent > clientHeight ? header.style.backgroundColor = "#061015" : header.style.backgroundColor = "inherit";
    positionStart = positionCurrent;
});


