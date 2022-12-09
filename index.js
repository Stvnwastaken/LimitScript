(function(window, document) {
    let initObject = {
        init: () => {
          let date = new Date()
          let time = 0
          let old_date = localStorage.getItem("Light's_date")
          if(old_date !== date){
            localStorage.setItem("Light's_tracker", 0)
          }
          let dateTracker = localStorage.setItem("Light's_date", date)
          let isTracker = localStorage.getItem("Light's_tracker") ? true : false
          isTracker ? '' : localStorage.setItem("Light's_tracker", 0)
          },
        update: setInterval(() => {
            let name = window.location.href
            console.log(name)
            let tracker = localStorage.getItem("Light's_tracker")
            tracker++
            console.log(tracker)
            tracker > 30 ? document.body.innerHTML = `<h1 style='color: black; font-weight: semi-bold; text-align: center;'>You have exceeded the time limit of playing: ${name} </h1>` : ''
            localStorage.setItem("Light's_tracker", tracker)
        }, 5000)
    }
        window.onLoad = () => {
            let currentObject = initObject
            currentObject.init()
            currentObject.update()
        }

})(window, document);