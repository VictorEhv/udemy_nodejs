console.log("Client side app.js")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error) {
                if(typeof(data.error) === 'string') {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.error.Error
                }
            } else {
                messageOne.textContent = data.found_location
                messageTwo.textContent = data.responseFC
            }
        })
    })
})
