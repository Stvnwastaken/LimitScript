(function(window){
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    let currentTab,
    currentDate,
    currentTime,
    intName2,
    server = 'wss://stalk.lightdarkhole.repl.co/socket',
    socket,

    updateLoop = async (socket) => {
        intName2 = setInterval(() => {
            currentTime++
            console.log(currentTime)
            socket.send('stalkme/time/' + currentTime)
            //every minute
        }, 60000)
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
        clearInterval(intName2)
    },

    setupWS = async (messageInConsole='Connecting to server socket') => {
        let now
        let msg = messageInConsole
        socket = new WebSocket(server)
        socket.onopen = () => {
            console.log(msg)
            now = new Date()
            let noww = new Date()
                    let ms = noww - now
                    console.log(`Connection to server: ${server} successful in ${ms} ms`)
                    socket.send('stalkme/ms/' + ms)
                    socket.send('stalkme/tab/' + currentTab)
                    socket.send('stalkme/date/' + currentDate.toString())
                    updateLoop(socket)
            socket.onmessage = async (message) => {
                console.log(message)
            }
        }
        socket.onclose = () => {
            console.log(`Connection to server: ${server} is lost`)
            console.log('Failed to connect to server socket')
            console.log('Server might be down')
            //last time it crashed repl cuz it tried to fast :skull:
            sleep(60000)
            setupWS('Attempting to reconnect to server socket')
            clearInterval(intName2)
        }
        socket.onerror = () => {
            console.log('Failed to connect to server socket')
        }
    },

    init = async () => {
        await runCheck().then(setupWS())
    }
    window.onload = init()
})(window)