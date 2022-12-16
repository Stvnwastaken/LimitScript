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

(function(window, document){
    let currentTab,
    currentDate,
    currentTime,
    server = 'wss://',
    intName,
    socket,

    updateLoop = async () => {
        intName = setInterval(() => {
            currentTime++
            return currentTime
        }, 1000)
        intName()
    },

    runCheck = async () => {
        if(!localStorage.getItem("Light's_time")){
            localStorage.setItem("Light's_date", new Date())
            currentDate = localStorage.getItem("Light's_date")
        }else{
            localStorage.setItem("Light's_date", new Date())
            currentDate = localStorage.getItem("Light's_date")
        }
        currentTab = window.location.href
        clearInterval(intName)
    },

    heartbeat = () => {
        clearTimeout(this.pingTimeout)
        this.pingTimeout = setTimeout(() => {
            this.terminate()
        }, 10000)
    },

    setupWS = async () => {
        socket = new WebSocket(server)
        socket.onopen = () => {
            socket.send('ping')
            heartbeat()
            socket.onmessage = async (message) => {
                if(message.data == 'pong'){
                    console.log(`Connection to server: ${server} successful`)
                    socket.send(JSON.stringify(currentTab))
                    socket.send(JSON.stringify(currentDate))
                    let curTime = await updateLoop()
                    socket.send(JSON.stringify(curTime))
                }
            }
        }
        socket.onclose('ping', heartbeat)
        socket.onclose = () => {
            console.log(`Connection to server: ${server} is lost`)
            clearTimeout(this.pingTimeout)
        }
    },

    init = async () => {
        await runCheck().then(setupWS())
    }
    window.onload = init()
    window.onclose = socket.close()
})(window, document)