const log = console.log
log('client side JS')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#p1')
const message2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchInput.value
    message1.textContent = 'Locading...'
    message2.textContent = ''
    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = 'Please enter address/location'
                message2.textContent = ''
                return
            }
            message1.textContent = data.location
            message2.textContent = 'Current temprature is ' + data.temperature + ' with ' + data.descriptions
        })
    })    
})