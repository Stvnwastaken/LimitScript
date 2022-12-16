// ==UserScript==
// @name         StalkDev
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

(function(window){
    let currentTab,
    currentDate,
    currentTime,
    intName1,
    intName2,
    server = 'wss://stalk.lightdarkhole.repl.co/socket',
    socket,

    intTry = async () => {
       intName1 = setInterval(() => {
            socket = new Websocket(server)
        }, 10000)
    },

    updateLoop = async (socket) => {
        intName2 = setInterval(() => {
            currentTime++
            console.log(currentTime)
            socket.send(currentTime)
        }, 1000)
    },

    runCheck = async () => {
        if(!localStorage.getItem("Light's_date")){
            localStorage.setItem("Light's_date", new Date())
            currentDate = localStorage.getItem("Light's_date")
        }else{
            localStorage.setItem("Light's_date", new Date())
            currentDate = localStorage.getItem("Light's_date")
        }
        currentTab = window.location.href
        currentTime = 0
        clearInterval(intName1)
        clearInterval(intName2)
    },

    setupWS = async () => {
        let now
        socket = new WebSocket(server)
        socket.onopen = () => {
            console.log('Connecting to server socket')
            now = new Date()
            socket.send('ping')
            socket.onmessage = async (message) => {
                if(message.data == 'pong'){
                    let noww = new Date()
                    let ms = noww - now
                    console.log(`Connection to server: ${server} successful in ${ms} ms`)
                    socket.send(currentTab.toString())
                    socket.send(currentDate.toString())
                    updateLoop(socket)
                }
            }
        }
        socket.onclose = () => {
            console.log(`Connection to server: ${server} is lost`)
            console.log('Server might be down')
            intTry()
            clearInterval(intName2)
        }
    },

    init = async () => {
        await runCheck().then(setupWS())
    }
    window.onload = init()
})(window)