"use strict"

const burger = document.querySelector('.burger');

burger.addEventListener('click', function () {
    document.body.classList.toggle('_lock');
    burger.previousElementSibling.classList.toggle('_active');
    burger.classList.toggle('_active');
});
window.onload = function () {

}