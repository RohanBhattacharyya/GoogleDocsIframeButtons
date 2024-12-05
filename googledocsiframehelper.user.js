// ==UserScript==
// @name        Google Docs Iframe Helper
// @namespace   Violentmonkey Scripts
// @match       https://conejousd.instructure.com/courses/47286/*
// @grant       none
// @version     1.0
// @author      -
// @description 12/4/2024, 8:17:48 PM
// ==/UserScript==


(function() {
    'use strict';

    function createButtons(iframe) {
        if (iframe.dataset.buttonsAdded) return;
        iframe.dataset.buttonsAdded = true;

        // Create a container div to wrap the iframe
        let container = document.createElement('div');
        container.style.position = 'relative';
        iframe.parentNode.insertBefore(container, iframe);
        container.appendChild(iframe);

        // Create a buttons container
        let buttonsContainer = document.createElement('div');
        buttonsContainer.style.position = 'absolute';
        buttonsContainer.style.bottom = '10px';
        buttonsContainer.style.right = '10px';
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '10px'; // Space between buttons
        buttonsContainer.style.zIndex = '9999'; // Ensure the buttons are on top

        // Create the Open button
        let openButton = document.createElement('button');
        openButton.style.backgroundColor = 'blue';
        openButton.style.color = 'white';
        openButton.style.padding = '5px 10px';
        openButton.style.border = 'none';
        openButton.style.borderRadius = '3px';
        openButton.style.cursor = 'pointer';
        openButton.style.display = 'flex';
        openButton.style.alignItems = 'center';

        // Create the Open icon SVG
        let openIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        openIcon.setAttribute("height", "16");
        openIcon.setAttribute("width", "16");
        openIcon.setAttribute("viewBox", "0 0 24 24");
        openIcon.style.fill = 'currentColor';
        let openPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        openPath1.setAttribute("d", "M14 3v2h3.59L8 14.59 9.41 16 17 8.41V12h2V3z");
        let openPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        openPath2.setAttribute("d", "M5 5v14h14v-7h-2v5H7V7h5V5H5z");
        openIcon.appendChild(openPath1);
        openIcon.appendChild(openPath2);

        // Add the icon and text to the Open button
        openButton.appendChild(openIcon);
        let openText = document.createTextNode(' Open');
        openButton.appendChild(openText);

        openButton.onclick = function() {
            window.open(iframe.src, '_blank');
        };

        // Create the Copy button
        let copyButton = document.createElement('button');
        copyButton.style.backgroundColor = 'red';
        copyButton.style.color = 'white';
        copyButton.style.padding = '5px 10px';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '3px';
        copyButton.style.cursor = 'pointer';
        copyButton.style.display = 'flex';
        copyButton.style.alignItems = 'center';

        // Create the Copy icon SVG
        let copyIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        copyIcon.setAttribute("height", "16");
        copyIcon.setAttribute("width", "16");
        copyIcon.setAttribute("viewBox", "0 0 24 24");
        copyIcon.style.fill = 'currentColor';
        let copyPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        copyPath1.setAttribute("d", "M16 1H4c-1.1 0-1.99.9-1.99 2L2 17h2V3h12V1z");
        let copyPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        copyPath2.setAttribute("d", "M20 5H8c-1.1 0-2 .9-2 2v14h14V7c0-1.1-.9-2-2-2zm0 16H8V7h12v14z");
        copyIcon.appendChild(copyPath1);
        copyIcon.appendChild(copyPath2);

        // Add the icon and text to the Copy button
        copyButton.appendChild(copyIcon);
        let copyText = document.createTextNode(' Copy');
        copyButton.appendChild(copyText);

        copyButton.onclick = function() {
            let copyUrl = iframe.src.replace('/preview', '/copy');
            window.open(copyUrl, '_blank');
        };

        // Add the buttons to the buttons container
        buttonsContainer.appendChild(openButton);
        buttonsContainer.appendChild(copyButton);

        // Add the buttons container to the main container
        container.appendChild(buttonsContainer);
    }

    function processIframes() {
    let iframes = document.getElementsByTagName('iframe');
    console.log('Checking for iframes:', iframes.length);
    for(let i = 0; i < iframes.length; i++) {
        let iframe = iframes[i];
        let src = iframe.src;
        console.log(`Iframe ${i}: src=${src}`);
        if(src && src.includes('docs.google.com') && src.includes('/preview')) {
            console.log('Match found:', iframe);
            createButtons(iframe);
        }
    }
}


    // Check every second for new iframes
    setInterval(processIframes, 1000);
})();
