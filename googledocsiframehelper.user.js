// ==UserScript==
// @name        Google Docs Iframe Helper
// @namespace   Violentmonkey Scripts
// @match       https://conejousd.instructure.com/courses/*
// @grant       none
// @version     1.1
// @author      Rohan/OpenAI
// @description Use it for embedded google docs iframes in Canvas.
// ==/UserScript==

(function() {
    'use strict';

    // Load the Google Material Icons font if not already loaded
    let link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

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

        // Material icon for "Open in New"
        let openIcon = document.createElement('span');
        openIcon.className = 'material-icons';
        openIcon.textContent = 'open_in_new';

        // Add the icon and text to the Open button
        openButton.appendChild(openIcon);
        let openText = document.createTextNode(' Open');
        openButton.appendChild(openText);

        openButton.onclick = function() {
            window.open(iframe.src.replace('/preview', '/edit'), '_blank');
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

        // Material icon for "Content Copy"
        let copyIcon = document.createElement('span');
        copyIcon.className = 'material-icons';
        copyIcon.textContent = 'content_copy';

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
