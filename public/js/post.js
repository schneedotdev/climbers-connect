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

const comments = document.querySelector('.comments--list')
let expanded = false

comments.addEventListener('click', (e) => {
    let { target } = e

    // change target to point to the comment text stored in the p tag
    if (target === 'img' || target === 'span') return
    if (target.classList[0] === 'comment--li')
        target = target.childNodes[3]

    // if the text is expanded, add the elipsis class which will cap the text length, else remove it
    if (expanded) {
        target.classList.add('elipsis')
    } else {
        target.classList.remove('elipsis')
    }

    // negate the value of expanded for every other click
    expanded = !expanded
})