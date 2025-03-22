// ==UserScript==
// @name         Best Creatures Video Inverter & Replacer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Inverts video or replaces it with an external iframe based on stream title
// @author       Best Creature
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to toggle video inversion
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

    // Function to replace video with external iframe
    function replaceVideoWithIframe() {
        const videoPlayer = document.querySelector('.video-player');
        if (videoPlayer) {
            videoPlayer.outerHTML = '<iframe src="https://vkvideo.ru/video_ext.php?oid=1037355211&id=456239017" width="100%" height="100%" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>';
        }
    }

    // Function to check stream title for specific commands
    function checkStreamTitle() {
        const titleElement = document.querySelector('[data-a-target="stream-title"]');
        if (titleElement) {
            const title = titleElement.getAttribute('title');
            if (title) {
                if (title.includes('!script')) {
                    toggleVideoInvert(true);  // Invert video if !script is found
                } else {
                    toggleVideoInvert(false); // Reset video if !script is not found
                }

                if (title.includes('!iq')) {
                    replaceVideoWithIframe();  // Replace video if !iq is found
                }
            }
        }
    }

    // Run the check every 5 seconds
    setInterval(checkStreamTitle, 5000);
})();
