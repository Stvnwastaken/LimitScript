// ==UserScript==
// @name         LimitScript
// @namespace    http://github.com/LightLordYT
// @version      1.3.0
// @description  a simple script that allows you to block certain websites with @match after x time elapsed, password implemented and can be changed along with time elapsed to block
// @author       LightLord
// @match        https://crazygames.com/*
// @match        https://poki.com/*
// @match        https://*.io/
// @match        https://*.one/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

window.onload = () => {
            let script = document.createElement('script')
            let head = document.head
            script.src = 'https://cdn.jsdelivr.net/gh/LightLordYT/LimitScript/pure.js'
            head.append(script)
}