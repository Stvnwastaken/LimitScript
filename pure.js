(function(window, document) {
    let destroyed
    let initObject = {
        handleRes: (name) => {
          function res(){
            let response = prompt('pswrd?')
            if(response == 'focusboy'){
              localStorage.setItem("Light's_tracker", 0)
              alert('refresh the page')
            }else{
              alert('wrong boy')
            }
          }
          document.body.innerHTML = `<h1 style='background-color: white; color: black; font-weight: semi-bold; text-align: center;'>You have exceeded the time limit of playing: ${name} </h1>`
          document.addEventListener('keydown', (e) => {
              //bind whatever key you want
            e.key == 'Control' ? res() : ''
          })
        },
        init: () => {
          destroyed = false
          let date = new Date()
          let old_date = localStorage.getItem("Light's_date")
          if(old_date !== date){
            localStorage.setItem("Light's_tracker", 0)
          }
          localStorage.setItem("Light's_date", date)
          let isTracker = localStorage.getItem("Light's_tracker") ? true : false
          isTracker ? '' : localStorage.setItem("Light's_tracker", 0)
          },
          //hopefully can make this more effecient by "hacking" into the game tick function dynamically somehow
        update: setInterval(() => {
            let handler = initObject.handleRes.bind(initObject)
            let name = window.location.href
            let tracker = localStorage.getItem("Light's_tracker")
            tracker++
            tracker > 720 ? handler(name) : ''
            localStorage.setItem("Light's_tracker", tracker)
            //so doesnt loop forever and make new loops to call stack, glitches tampermonkey out, slows page down
            //remember we have to be discreet or user will find out about the script
            if(destroyed){
              let setCurrent = initObject.update.bind(initObject)
              clearInterval(setCurrent)
            }
        }, 5000),
        destroy: () => {
          destroyed = true
        }
    }
        window.onLoad = () => {
            let currentObject = initObject
            currentObject.init()
            currentObject.update()
            window.onclose = () => {
              currentObject.destroy()
            }
        }
  
  })(window, document);