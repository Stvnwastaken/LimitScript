// ==UserScript==
// @name         Stalk
// @namespace    http://github.com/LightLordYT
// @version      1.3.2
// @description  a simple script that allows you to stalk certain websites with @match
// @author       LightLord
// @match        https://crazygames.com/*
// @match        https://*/*
// @exclude      https://google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

window.onload = () => {
    let script = document.createElement('script')
    let head = document.head
    script.src = 'https://cdn.jsdelivr.net/gh/LightLordYT/LimitScript/tracker.js'
    head.append(script)
}