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

    setupWS = async () => {
        socket = new WebSocket(server)
        socket.onopen = () => {
            socket.send('ping')
            socket.onmessage = async (message) => {
                if(message.data == 'pong'){
                    console.log(`Connection to server: ${server} successful`)
                    socket.send(currentDate)
                    let curTime = await updateLoop()
                    socket.send(curTime)
                }
            }
        }
        socket.onclose = () => {
            console.log(`Connection to server: ${server} is lost`)
        }
    },

    init = async () => {
        await runCheck().then(setupWS())
    }
    window.onload = init()
    window.onclose = socket.close()
})(window, document)