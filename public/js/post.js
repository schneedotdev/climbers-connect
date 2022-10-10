const body = document.querySelector('body')
const edit = document.querySelector('.edit--options')
const form = document.querySelector('.options--form')
let display = false

body.addEventListener('click', (e) => {
    if (e.target !== edit && !display) return

    if (!display) {
        form.style.display = 'block'
        display = !display
    } else {
        form.style.display = 'none'
        display = !display
    }
})