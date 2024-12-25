// ==UserScript==
// @name         Best Creatures Video Inverter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Inverts video
// @author       Best Creature
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    function toggleVideoInvert(shouldInvert) {
        const video = document.querySelector('video');
        if (video) {
            if (shouldInvert) {
                video.style.transform = 'rotate(180deg)';
                video.style.filter = 'invert(1)';
            } else {
                video.style.transform = '';
                video.style.filter = '';
            }
        }
    }


    function checkStreamTitle() {
        const titleElement = document.querySelector('h2[data-a-target="stream-title"]');
        if (titleElement) {
            const title = titleElement.getAttribute('title');
            if (title && title.includes('!script')) {
                toggleVideoInvert(true);
            } else {
                toggleVideoInvert(false);
            }
        }
    }


    setInterval(checkStreamTitle, 1000);
})();
