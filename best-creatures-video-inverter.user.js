// ==UserScript==
// @name         Best Creatures Video Inverter & Replacer
// @namespace    http://tampermonkey.net/
// @version      1.2
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

    // Function to replace video with external iframe and autoplay
    function replaceVideoWithIframe() {
        const videoPlayer = document.querySelector('.video-player');
        if (videoPlayer) {
            // Create an iframe with autoplay enabled
            const iframe = document.createElement('iframe');
            iframe.src = 'https://vkvideo.ru/video_ext.php?oid=1037355211&id=456239017&autoplay=1'; // Adding autoplay=1 to the URL
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameborder = '0';
            iframe.allowfullscreen = '1';
            iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
            
            // Replace the video player with the iframe
            videoPlayer.outerHTML = iframe.outerHTML;
            
            // Wait for the iframe to load and try to play the video
            iframe.onload = function() {
                try {
                    // Attempt to play the video inside the iframe
                    const iframeDoc = iframe.contentWindow.document;
                    const iframeVideo = iframeDoc.querySelector('video');
                    if (iframeVideo) {
                        iframeVideo.play();
                    }
                } catch (error) {
                    console.error("Error trying to play the video in the iframe:", error);
                }
            };
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
                    replaceVideoWithIframe();  // Replace video with iframe if !iq is found
                }
            }
        }
    }

    // Run the check every 5 seconds
    setInterval(checkStreamTitle, 2000);
})();
